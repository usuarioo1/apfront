'use client'
import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '@/contexts/CartContext'; // Asegúrate de tener este contexto creado

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems } = useContext(CartContext); // Usamos el contexto para acceder a los items del carrito
    const cantidadTotal = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculamos la cantidad total de productos

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="navbar bg-white relative z-50 h-20">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-1 text-center">
                <span className="text-2xl font-semibold">Artesanías Pachy</span>
            </div>
            <div className="flex-none md:hidden">
                <button onClick={toggleMenu} className="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
            <div className="hidden md:flex flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li className='text-xl'><Link href="/">Inicio</Link></li>
                    <li className='text-xl'><Link href='/about'>Quienes Somos</Link></li>
                    <li>
                        <details>
                            <summary className='text-xl'>Productos</summary>
                            <ul className="bg-white rounded-t-none p-2 z-50 w-full">
                                <li className='text-xl'><Link href="/anillos">Anillos</Link></li>
                                <li className='text-xl'><Link href="/colgantes">Colgantes</Link></li>
                                <li className='text-xl'><Link href="/pulseras">Pulseras</Link></li>
                                <li className='text-xl'><Link href="/conjuntos">Conjuntos</Link></li>
                                <li className='text-xl'><Link href="/collares">Collares</Link></li>
                                <li className='text-xl'><Link href="/aros">Aros</Link></li>
                                <li className='text-xl'><Link href="/figuras">Figuras</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li className='text-xl'><Link href="/contacto">Contacto</Link></li>
                </ul>
            </div>

            {/* Carrito de compras */}
            <div className="hidden md:flex items-center">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="badge badge-sm indicator-item">{cantidadTotal}</span>
                        </div>
                    </div>
                    <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow z-50">
                        <div className="card-body">
                            <span className="font-bold text-lg">{cantidadTotal} Productos</span>
                            <div className="card-actions">
                                <Link href='/cart'>
                                    <button className="btn btn-primary btn-block">Ver Carrito</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50 mt-4">
                    <ul className="menu p-4">
                        <li><Link href="/">Inicio</Link></li>
                        <li><Link href="#">Quienes Somos</Link></li>
                        <li>
                            <details>
                                <summary>Productos</summary>
                                <ul className="bg-slate-100 rounded-md p-2 z-50 w-auto">
                                <li><Link href="/anillos">Anillos</Link></li>
                                <li><Link href="/colgantes">Colgantes</Link></li>
                                <li><Link href="/pulseras">Pulseras</Link></li>
                                <li><Link href="/conjuntos">Conjuntos</Link></li>
                                <li><Link href="collares">Collares</Link></li>
                                <li><Link href="/aros">Aros</Link></li>
                                <li><Link href="/figuras">Figuras</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li><Link href="#">Contacto</Link></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
