export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/sys/', '/api/'],
    },
    sitemap: 'https://www.jewelexchange.lk/sitemap.xml',
  }
}
