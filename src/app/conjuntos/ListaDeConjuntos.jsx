'use client';
import React, { useEffect, useState, useContext } from 'react';
import { getConjuntos } from './conjuntosApi'; // Función para obtener la lista de conjuntos
import Link from 'next/link';
import { CartContext } from '@/contexts/CartContext'; // Importamos el contexto

const ListaDeConjuntos = () => {
    const [conjuntos, setConjuntos] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const { addItem } = useContext(CartContext); // Usamos la función addItem desde el contexto

    useEffect(() => {
        const fetchConjuntos = async () => {
            try {
                const data = await getConjuntos();  // Obtenemos la lista de conjuntos
                if (data) {
                    setConjuntos(data);  // Guardamos los conjuntos en el estado
                } else {
                    console.log('No se encontraron conjuntos');
                }
            } catch (error) {
                console.error('Error al obtener los conjuntos:', error);
            } finally {
                setLoading(false); // Finalizamos la carga
            }
        };

        fetchConjuntos();
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
        ); // Mensaje de carga
    }

    // Función para añadir un conjunto al carrito
    const handleAddToCart = (conjunto) => {
        addItem(conjunto);  // Añadimos el conjunto al carrito
        console.log('Conjunto añadido al carrito:', conjunto);
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen mb-5">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Conjuntos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {conjuntos.map((conjunto) => (
                    <div key={conjunto._id} className="card bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-[520px]">
                        <figure className="px-4 pt-4 flex-shrink-0">
                            <Link href={`/conjuntos/${conjunto._id}`} className="w-full">
                                <img
                                    src={conjunto.img}
                                    alt={conjunto.name}
                                    className="rounded-xl h-56 w-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </Link>
                        </figure>
                        <div className="card-body p-4 bg-white rounded-b-2xl flex flex-col flex-grow">
                            <h2 className="card-title justify-center text-xl font-medium text-gray-800 line-clamp-1">
                                {conjunto.name}
                            </h2>
                            <div className="space-y-2 mt-2">
                                <div className="flex justify-between items-center px-3 py-1.5 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-600">Precio detalle:</span>
                                    <span className="font-semibold text-gray-800">${conjunto.precio}</span>
                                </div>
                                <div className="flex justify-between items-center px-3 py-1.5 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-600">Precio mayor:</span>
                                    <span className="font-semibold text-gray-800">${Math.round(conjunto.precio / 1.5)}</span>
                                </div>
                                <div className="flex justify-between items-center px-3 py-1.5 bg-gray-50 rounded-lg">
                                    <span className="text-sm text-gray-600">Stock:</span>
                                    <span className="font-semibold text-gray-800">{conjunto.stock}</span>
                                </div>
                                <p className="text-center text-red-600 font-medium bg-red-50 py-1.5 rounded-lg">No incluye cadena</p>
                            </div>
                            <div className="card-actions justify-center mt-auto">
                                <button
                                    onClick={() => handleAddToCart(conjunto)}
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
};

export default ListaDeConjuntos;
