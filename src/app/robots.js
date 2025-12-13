export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout/', '/cart/'],
      },
    ],
    sitemap: 'https://www.artesaniaspachy.cl/sitemap.xml',
  };
}
