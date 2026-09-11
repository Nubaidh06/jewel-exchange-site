export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/sys/', '/api/', '/showroom', '/showroom/'],
    },
    sitemap: 'https://www.jewelexchange.lk/sitemap.xml',
  }
}
