'use client'
import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="navbar bg-white relative z-50">
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
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Quienes Somos</a></li>
                    <li>
                        <details>
                            <summary>Productos</summary>
                            <ul className="bg-white rounded-t-none p-2 z-50">
                                <li><a href="#">Link 1</a></li>
                                <li><a href="#">Link 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            </div>

            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50 mt-4">
                    <ul className="menu p-4">
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Quienes Somos</a></li>
                        <li>
                            <details>
                                <summary>Productos</summary>
                                <ul className="bg-white rounded-t-none p-2 z-50">
                                    <li><a href="#">Link 1</a></li>
                                    <li><a href="#">Link 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
