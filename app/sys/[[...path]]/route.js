import http from 'http';
import zlib from 'zlib';

const BACKEND_HOST = '208.109.224.41';
const VIRTUAL_HOST = 'jewelexchange.lk';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function handleProxy(request, context) {
  try {
    const { params } = await (context?.params ? context : { params: {} });
    const resolvedParams = await params;
    const pathSegments = resolvedParams?.path || [];
    const subpath = Array.isArray(pathSegments) ? pathSegments.join('/') : (pathSegments || '');
    const search = request.nextUrl?.search || '';

    // Destination path on backend
    let targetPath = `/sys/${subpath}${search}`;
    if (subpath === '' && !targetPath.endsWith('/')) {
      targetPath = `/sys/${search}`;
    }

    // Prepare outgoing headers
    const outgoingHeaders = {};
    request.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      // Remove hop-by-hop headers, content-length, and accept-encoding to prevent double/unhandled gzip
      if (!['host', 'connection', 'content-length', 'accept-encoding'].includes(lowerKey)) {
        outgoingHeaders[lowerKey] = value;
      }
    });

    // Enforce virtual host required by Apache
    outgoingHeaders['host'] = VIRTUAL_HOST;

    const clientIp = request.headers.get('x-forwarded-for') || request.ip;
    if (clientIp) {
      outgoingHeaders['x-forwarded-for'] = clientIp;
    }

    // Read body if POST/PUT/PATCH
    let bodyBuffer = null;
    if (!['GET', 'HEAD'].includes(request.method)) {
      const arrayBuffer = await request.arrayBuffer();
      if (arrayBuffer.byteLength > 0) {
        bodyBuffer = Buffer.from(arrayBuffer);
        outgoingHeaders['content-length'] = bodyBuffer.length;
      }
    }

    // Forward request to backend Apache server
    const backendResult = await new Promise((resolve, reject) => {
      const req = http.request(
        {
          host: BACKEND_HOST,
          port: 80,
          path: targetPath,
          method: request.method,
          headers: outgoingHeaders,
        },
        (res) => {
          const chunks = [];
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () => {
            resolve({
              statusCode: res.statusCode || 200,
              statusMessage: res.statusMessage,
              headers: res.headers,
              body: Buffer.concat(chunks),
            });
          });
        }
      );

      req.on('error', (err) => reject(err));

      if (bodyBuffer) {
        req.write(bodyBuffer);
      }
      req.end();
    });

    let responseBody = backendResult.body;

    // Handle decompression if backend sent compressed data
    const encoding = backendResult.headers['content-encoding'];
    if (encoding === 'gzip') {
      responseBody = zlib.gunzipSync(responseBody);
    } else if (encoding === 'deflate') {
      responseBody = zlib.inflateSync(responseBody);
    } else if (encoding === 'br') {
      responseBody = zlib.brotliDecompressSync(responseBody);
    }

    const contentType = (backendResult.headers['content-type'] || '').toLowerCase();

    // In HTML responses, rewrite hardcoded http://jewelexchange.lk/sys to relative /sys
    // This fixes asset loading on localhost and avoids HTTPS mixed-content warnings on production
    if (contentType.includes('text/html') || contentType.includes('application/xhtml+xml')) {
      let html = responseBody.toString('utf-8');
      html = html.replace(/http:\/\/([wW]{3}\.)?jewelexchange\.lk\/sys\/?/gi, (match) => {
        return match.endsWith('/') ? '/sys/' : '/sys';
      });
      responseBody = Buffer.from(html, 'utf-8');
    }

    // Prepare response headers
    const responseHeaders = new Headers();
    Object.entries(backendResult.headers).forEach(([key, val]) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey === 'set-cookie') {
        if (Array.isArray(val)) {
          val.forEach((cookie) => responseHeaders.append('set-cookie', cookie));
        } else if (val) {
          responseHeaders.append('set-cookie', val);
        }
      } else if (lowerKey === 'location') {
        // Rewrite location header for redirects
        const loc = Array.isArray(val) ? val[0] : val;
        const rewritten = loc.replace(/^http:\/\/([wW]{3}\.)?jewelexchange\.lk\/sys/i, '/sys');
        responseHeaders.set('location', rewritten);
      } else if (!['content-encoding', 'content-length', 'transfer-encoding', 'connection'].includes(lowerKey)) {
        if (Array.isArray(val)) {
          val.forEach((v) => responseHeaders.append(key, v));
        } else if (val) {
          responseHeaders.set(key, val);
        }
      }
    });

    return new Response(responseBody, {
      status: backendResult.statusCode,
      statusText: backendResult.statusMessage,
      headers: responseHeaders,
    });
  } catch (err) {
    console.error('Inventory proxy error:', err);
    return new Response(
      `<html><body><h2>Jewel Exchange System Gateway Error</h2><p>Unable to connect to inventory backend: ${err.message}</p></body></html>`,
      { status: 502, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
export const HEAD = handleProxy;
export const OPTIONS = handleProxy;
