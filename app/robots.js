export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/'],
    },
    sitemap: 'https://jewelexchange.lk/sitemap.xml',
  }
}
