export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/'],
    },
    sitemap: 'https://www.jewelexchange.lk/sitemap.xml',
  }
}
