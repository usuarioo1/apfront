'use client'
import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { CartContext } from '@/contexts/CartContext';
import { Globe } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const { cartItems } = useContext(CartContext);
    const cantidadTotal = cartItems.reduce((total, item) => total + item.quantity, 0);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const productCategories = [
        // { href: "/ofertas", name: "Ofertas" },
        { href: "/colgantes", name: "Colgantes" },
        { href: "/pulseras", name: "Pulseras" },
        { href: "/conjuntos", name: "Conjuntos" },
        { href: "/collares", name: "Collares" },
        { href: "/aros", name: "Aros" },
        { href: "/figuras", name: "Figuras" },
        { href: "/cadenas", name: "Cadenas" },
        { href: "/accesorios", name: "Accesorios" }
    ];

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    
                    {/* Logo */}
                    <Link href='/' className="flex-shrink-0">
                        <div className="flex items-center space-x-2">
                            {/* Ícono de globo terráqueo */}
                            <Globe className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-800" />
                            
                            {/* Texto del logo */}
                            <div className="flex flex-col">
                                <span className="text-lg sm:text-xl lg:text-2xl font-serif font-light text-gray-800 leading-tight tracking-wide">
                                    Artesanías Pachy
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Menú Desktop */}
                    <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm xl:text-base">
                            Inicio
                        </Link>
                        
                        <Link href='/about' className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm xl:text-base">
                            Quiénes Somos
                        </Link>
                        
                        {/* Dropdown Productos */}
                        <div className="relative group">
                            <button
                                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 flex items-center text-sm xl:text-base"
                                onMouseEnter={() => setIsProductsOpen(true)}
                                onMouseLeave={() => setIsProductsOpen(false)}
                            >
                                Productos
                                <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {/* Dropdown Menu */}
                            <div 
                                className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 transition-all duration-200 ${
                                    isProductsOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
                                }`}
                                onMouseEnter={() => setIsProductsOpen(true)}
                                onMouseLeave={() => setIsProductsOpen(false)}
                            >
                                {productCategories.map((category) => (
                                    <Link 
                                        key={category.href}
                                        href={category.href} 
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 text-sm"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        
                        <Link href="/contacto" className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm xl:text-base">
                            Contacto
                        </Link>
                    </div>

                    {/* Carrito y Menú Mobile */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Carrito */}
                        <div className="relative flex items-center">
                            {/* Enlace directo al carrito para todos los dispositivos */}
                            <Link href="/cart" className="p-1.5 sm:p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all duration-200">
                                <div className="relative">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    {cantidadTotal > 0 && (
                                        <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-blue-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium">
                                            {cantidadTotal > 99 ? '99+' : cantidadTotal}
                                        </span>
                                    )}
                                </div>
                            </Link>
                            
                            {/* Carrito Dropdown - Solo visible en desktop y con hover */}
                            <div className="hidden lg:block absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                <div className="text-center py-4">
                                    <p className="font-semibold text-gray-900 mb-2">
                                        {cantidadTotal} {cantidadTotal === 1 ? 'Producto' : 'Productos'}
                                    </p>
                                    <Link href='/cart'>
                                        <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium">
                                            Ver Carrito
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Botón Menú Mobile */}
                        <button 
                            onClick={toggleMenu}
                            className="lg:hidden p-1.5 sm:p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all duration-200"
                        >
                            <svg className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Mobile */}
            <div className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-300 ${
                isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <div className="px-2 sm:px-4 py-3 sm:py-4 space-y-1">
                    <Link 
                        href="/" 
                        className="block py-2.5 sm:py-3 px-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base"
                        onClick={() => setIsOpen(false)}
                    >
                        Inicio
                    </Link>
                    
                    <Link 
                        href="/about" 
                        className="block py-2.5 sm:py-3 px-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base"
                        onClick={() => setIsOpen(false)}
                    >
                        Quiénes Somos
                    </Link>
                    
                    {/* Productos Mobile */}
                    <div className="py-2">
                        <p className="font-semibold text-gray-900 mb-2 sm:mb-3 px-2 text-xs sm:text-sm uppercase tracking-wide">Productos</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
                            {productCategories.map((category) => (
                                <Link 
                                    key={category.href}
                                    href={category.href} 
                                    className="block py-2 px-2 sm:px-3 text-xs sm:text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    
                    <Link 
                        href="/contacto" 
                        className="block py-2.5 sm:py-3 px-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base"
                        onClick={() => setIsOpen(false)}
                    >
                        Contacto
                    </Link>

                    {/* Carrito Mobile */}
                    <div className="pt-3 sm:pt-4 border-t border-gray-100 mt-3 sm:mt-4">
                        <Link 
                            href='/cart'
                            className="flex items-center justify-between py-2.5 sm:py-3 px-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="flex items-center">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Ver Carrito
                            </span>
                            {cantidadTotal > 0 && (
                                <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-medium">
                                    {cantidadTotal > 99 ? '99+' : cantidadTotal}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;