'use client';
import React, { useEffect, useState, useContext } from 'react';
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {collares.map((collar) => (
                    <div
                        key={collar._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
                    >
                        <Link href={`/collares/${collar._id}`}>
                            <div className="aspect-square relative">
                                <img
                                    src={collar.img}
                                    alt={collar.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </Link>
                        <div className="p-4 flex flex-col flex-grow">
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{collar.name}</h2>
                                <p className="text-center text-gray-600">Precio: ${collar.precio}</p>
                                <strong>
                                    <p className="text-center text-gray-600">
                                        Precio por mayor: ${Math.round(collar.precio / 1.5)}
                                    </p>
                                </strong>
                                <p className="text-center text-gray-600 mb-2">stock : {collar.stock}</p>
                            </div>
                            <button
                                className="w-full bg-blue-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 mt-4"
                                onClick={() => handleAddToCart(collar)}
                            >
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
