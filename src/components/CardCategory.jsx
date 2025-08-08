import React from 'react';
import Link from 'next/link';

const CardCategory = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center my-9 p-4">
            <Link href='/aros' className="hover:scale-105 transition-transform duration-300">
                <div className="card bg-gradient-to-br from-gray-200 to-gray-300 w-80 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="card-body p-4">
                        <h2 className="card-title justify-center text-xl text-gray-700">AROS</h2>
                    </div>
                    <figure className="px-4 pb-4">
                        <img
                            className='rounded-xl h-48 w-full object-cover'
                            src="https://res.cloudinary.com/dc9kszgso/image/upload/v1732043343/artesanias%20pachy/aros/x100u2qplydrkuwwxxbr.jpg"
                            alt="Aros" />
                    </figure>
                </div>
            </Link>
            <Link href='/colgantes' className="hover:scale-105 transition-transform duration-300">
                <div className="card bg-gradient-to-br from-gray-200 to-gray-300 w-80 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="card-body p-4">
                        <h2 className="card-title justify-center text-xl text-gray-700">COLGANTES</h2>
                    </div>
                    <figure className="px-4 pb-4">
                        <img
                            className='rounded-xl h-48 w-full object-cover'
                            src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1729644005/apweb/categorias/aytpslpajger7xqgphuw.jpg"
                            alt="Colgantes" />
                    </figure>
                </div>
            </Link>
            <Link href='/pulseras' className="hover:scale-105 transition-transform duration-300">
                <div className="card bg-gradient-to-br from-gray-200 to-gray-300 w-80 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="card-body p-4">
                        <h2 className="card-title justify-center text-xl text-gray-700">PULSERAS</h2>
                    </div>
                    <figure className="px-4 pb-4">
                        <img
                            className='rounded-xl h-48 w-full object-cover'
                            src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1732673059/apweb/categorias/n7ig73ogksba81il4vf6.jpg"
                            alt="Pulseras" />
                    </figure>
                </div>
            </Link>
            <Link href='/conjuntos' className="hover:scale-105 transition-transform duration-300">
                <div className="card bg-gradient-to-br from-gray-200 to-gray-300 w-80 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="card-body p-4">
                        <h2 className="card-title justify-center text-xl text-gray-700">CONJUNTOS</h2>
                    </div>
                    <figure className="px-4 pb-4">
                        <img
                            className='rounded-xl h-48 w-full object-cover'
                            src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1729643715/apweb/categorias/gfvdovj17bxnqwpxsc8r.jpg"
                            alt="Conjuntos" />
                    </figure>
                </div>
            </Link>
            <Link href='/collares' className="hover:scale-105 transition-transform duration-300">
                <div className="card bg-gradient-to-br from-gray-200 to-gray-300 w-80 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="card-body p-4">
                        <h2 className="card-title justify-center text-xl text-gray-700">COLLARES</h2>
                    </div>
                    <figure className="px-4 pb-4">
                        <img
                            className='rounded-xl h-48 w-full object-cover'
                            src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1732672464/apweb/categorias/p25fdimvekebue4oura0.jpg"
                            alt="Collares" />
                    </figure>
                </div>
            </Link>
            <Link href='/figuras' className="hover:scale-105 transition-transform duration-300">
                <div className="card bg-gradient-to-br from-gray-200 to-gray-300 w-80 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="card-body p-4">
                        <h2 className="card-title justify-center text-xl text-gray-700">FIGURAS</h2>
                    </div>
                    <figure className="px-4 pb-4">
                        <img
                            className='rounded-xl h-48 w-full object-cover'
                            src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1732672183/apweb/categorias/yenzmeacznb5i0sjoohb.jpg"
                            alt="Figuras" />
                    </figure>
                </div>
            </Link>
            <Link href='/ofertas' className="hover:scale-105 transition-transform duration-300">
                <div className="card bg-gradient-to-br from-gray-200 to-gray-300 w-80 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="card-body p-4">
                        <h2 className="card-title justify-center text-xl text-gray-700">OFERTAS</h2>
                    </div>
                    <figure className="px-4 pb-4">
                        <img
                            className='rounded-xl h-48 w-full object-cover'
                            src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1732672987/apweb/categorias/wumywjbhylxi1jxbmn2y.png"
                            alt="Ofertas" />
                    </figure>
                </div>
            </Link>
            <Link href='/cadenas' className="hover:scale-105 transition-transform duration-300">
                <div className="card bg-gradient-to-br from-gray-200 to-gray-300 w-80 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="card-body p-4">
                        <h2 className="card-title justify-center text-xl text-gray-700">CADENAS</h2>
                    </div>
                    <figure className="px-4 pb-4">
                        <img
                            className='rounded-xl h-48 w-full object-cover'
                            src="https://res.cloudinary.com/dc9kszgso/image/upload/v1731939414/artesanias%20pachy/cadenas/uehrmjiwwopvyoq1kunr.webp"
                            alt="Shoes" />
                    </figure>
                </div>
            </Link>
            <Link href='/accesorios' className="hover:scale-105 transition-transform duration-300">
                <div className="card bg-gradient-to-br from-gray-200 to-gray-300 w-80 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="card-body p-4">
                        <h2 className="card-title justify-center text-xl text-gray-700">ACCESORIOS</h2>
                    </div>
                    <figure className="px-4 pb-4">
                        <img
                            className='rounded-xl h-48 w-full object-cover'
                            src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1732672510/apweb/categorias/nicrh71xpwqllmypukpl.jpg"
                            alt="Accesorios" />
                    </figure>
                </div>
            </Link>
        </div>
    )
}

export default CardCategory;
