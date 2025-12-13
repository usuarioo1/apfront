/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {protocol:'https',
            hostname:"res.cloudinary.com"},
            {protocol:'https',
            hostname:"www.corsojewelry.com"}
        ],
        formats: ['image/avif', 'image/webp'],
    },
    // Comprimir respuestas para mejor rendimiento
    compress: true,
    // Habilitar compresión brotli para mejor SEO
    poweredByHeader: false,
};

export default nextConfig;
