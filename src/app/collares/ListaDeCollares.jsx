'use client';
import React, { useEffect, useState, useContext, use } from 'react';
import { getCollares } from './collaresApi';  // Función para obtener todos los collares
import Link from 'next/link';
import { CartContext } from '@/contexts/CartContext';  // Importamos el contexto del carrito

export default function ListaDeCollares() {
    const [collares, setCollares] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext);  // Para añadir al carrito

    useEffect(() => {
        const fetchCollares = async () => {
            try {
                const data = await getCollares();  // Obtenemos la lista de collares
                setCollares(data);
            } catch (error) {
                console.error('Error fetching collares:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollares();
    }, []);

    useEffect(() => {
        // Deshabilitar clic derecho en imágenes
        const disableRightClickOnImages = (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', disableRightClickOnImages);

        return () => {
            document.removeEventListener('contextmenu', disableRightClickOnImages);
        };
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    // Función para añadir un collar al carrito
    const handleAddToCart = (collar) => {
        addItem(collar);  // Añadimos el producto al carrito usando la función addItem del contexto
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Collares</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {collares.map((collar) => (
                    <div key={collar._id} className="card bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-[520px]">
                        <figure className="px-4 pt-4 flex-shrink-0">
                            <Link href={`/collares/${collar._id}`} className="w-full">
                                <img
                                    src={collar.img}
                                    alt={collar.name}
                                    className="rounded-xl h-56 w-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </Link>
                        </figure>
                        <div className="card-body p-4 bg-white rounded-b-2xl flex flex-col flex-grow">
                            <h2 className="card-title justify-center text-xl font-medium text-gray-800 line-clamp-1">
                                {collar.name}
                            </h2>
                            <div className="space-y-2 mt-2">
                                <div className="flex justify-between items-center px-3 py-1.5 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-600">Precio detalle:</span>
                                    <span className="font-semibold text-gray-800">${collar.precio}</span>
                                </div>
                                <div className="flex justify-between items-center px-3 py-1.5 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-600">Precio mayor:</span>
                                    <span className="font-semibold text-gray-800">${Math.round(collar.precio / 1.5)}</span>
                                </div>
                                <div className="flex justify-between items-center px-3 py-1.5 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-600">Stock:</span>
                                    <span className="font-semibold text-gray-800">{collar.stock}</span>
                                </div>
                            </div>
                            <div className="card-actions justify-center mt-auto">
                                <button
                                    onClick={() => handleAddToCart(collar)}
                                    className="btn btn-primary w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 border-none shadow-md hover:shadow-lg"
                                >
                                    Añadir al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
