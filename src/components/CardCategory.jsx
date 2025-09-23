import React from 'react';
import Link from 'next/link';

const CardCategory = () => {
    const categories = [
        {
            href: '/aros',
            title: 'AROS',
            image: 'https://res.cloudinary.com/dc9kszgso/image/upload/v1732043343/artesanias%20pachy/aros/x100u2qplydrkuwwxxbr.jpg'
        },
        {
            href: '/colgantes',
            title: 'COLGANTES',
            image: 'https://res.cloudinary.com/dpbpyzl96/image/upload/v1729644005/apweb/categorias/aytpslpajger7xqgphuw.jpg'
        },
        {
            href: '/pulseras',
            title: 'PULSERAS',
            image: 'https://res.cloudinary.com/dpbpyzl96/image/upload/v1732673059/apweb/categorias/n7ig73ogksba81il4vf6.jpg'
        },
        {
            href: '/conjuntos',
            title: 'CONJUNTOS',
            image: 'https://res.cloudinary.com/dpbpyzl96/image/upload/v1729643715/apweb/categorias/gfvdovj17bxnqwpxsc8r.jpg'
        },
        {
            href: '/collares',
            title: 'COLLARES',
            image: 'https://res.cloudinary.com/dpbpyzl96/image/upload/v1732672464/apweb/categorias/p25fdimvekebue4oura0.jpg'
        },
        {
            href: '/figuras',
            title: 'FIGURAS',
            image: 'https://res.cloudinary.com/dpbpyzl96/image/upload/v1732672183/apweb/categorias/yenzmeacznb5i0sjoohb.jpg'
        },
        {
            href: '/cadenas',
            title: 'CADENAS',
            image: 'https://res.cloudinary.com/dc9kszgso/image/upload/v1731939414/artesanias%20pachy/cadenas/uehrmjiwwopvyoq1kunr.webp'
        },
        {
            href: '/accesorios',
            title: 'ACCESORIOS',
            image: 'https://res.cloudinary.com/dpbpyzl96/image/upload/v1732672510/apweb/categorias/nicrh71xpwqllmypukpl.jpg'
        },
        {
            href:'/catalogo',
            title: 'Todos los productos',
            image:'https://res.cloudinary.com/dc9kszgso/image/upload/v1758588353/Gemini_Generated_Image_od5bs1od5bs1od5b_onkkyg.png'
        }
        // {
        //     href: '/ofertas',
        //     title: 'OFERTAS',
        //     image: 'https://res.cloudinary.com/dpbpyzl96/image/upload/v1732672987/apweb/categorias/wumywjbhylxi1jxbmn2y.png'
        // }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categories.map((category) => (
                    <Link 
                        key={category.href}
                        href={category.href} 
                        className="group block"
                    >
                        <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                            {/* Imagen */}
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Overlay sutil */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                            
                            {/* Título */}
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 text-center tracking-wide">
                                    {category.title}
                                </h3>
                            </div>
                            
                            {/* Indicador visual */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CardCategory;