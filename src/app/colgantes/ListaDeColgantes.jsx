'use client';
import React, { useEffect, useState, useContext } from 'react';
import { getColgantes } from './colgantesApi'; // Función para obtener todos los colgantes
import Link from 'next/link';
import { CartContext } from '@/contexts/CartContext'; // Importamos el contexto del carrito

export default function ListaDeColgantes() {
    const [colgantes, setColgantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext); // Usamos la función addItem desde el contexto

    useEffect(() => {
        const fetchColgantes = async () => {
            try {
                const data = await getColgantes();
                setColgantes(data);
            } catch (error) {
                console.error('Error fetching colgantes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchColgantes();
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

    // Función para añadir un colgante al carrito
    const handleAddToCart = (colgante) => {
        addItem(colgante); // Añadimos el producto al carrito usando la función addItem del contexto
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Colgantes</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {colgantes.map((colgante) => (
                    <div
                        key={colgante._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
                    >
                        <Link href={`/colgantes/${colgante._id}`}>
                            <div className="aspect-square relative">
                                <img
                                    src={colgante.img}
                                    alt={colgante.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onContextMenu={(e) => e.preventDefault()} // Bloquear clic derecho en esta imagen
                                />
                            </div>
                        </Link>
                        <div className="p-4 flex flex-col flex-grow">
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{colgante.name}</h2>
                                <p className="text-center text-gray-600">Precio al detalle: ${colgante.precio}</p>
                                <strong>
                                    <p className="text-center text-gray-600">
                                        Precio por mayor: ${Math.round(colgante.precio / 1.5)}
                                    </p>
                                </strong>
                                <p className="text-center text-gray-600 mb-2">stock : {colgante.stock}</p>
                                <p className='text-center text-red-600'>No incluye cadena</p>
                            </div>
                            <button
                                className="w-full bg-blue-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 mt-4"
                                onClick={() => handleAddToCart(colgante)}
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
