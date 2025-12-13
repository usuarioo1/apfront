export default async function sitemap() {
  const baseUrl = 'https://www.artesaniaspachy.cl';

  // Rutas estáticas principales
  const routes = [
    '',
    '/about',
    '/catalogo',
    '/cart',
    '/checkout',
    '/contacto',
    '/terminos',
    '/collares',
    '/aros',
    '/pulseras',
    '/colgantes',
    '/cadenas',
    '/conjuntos',
    '/accesorios',
    '/figuras',
    '/ofertas',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
