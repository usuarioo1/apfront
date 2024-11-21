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
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Conjuntos</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {conjuntos.map((conjunto) => (
                    <div
                        key={conjunto._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
                    >
                        <Link href={`/conjuntos/${conjunto._id}`}>
                            <div className="aspect-square relative">
                                <img
                                    src={conjunto.img}
                                    alt={conjunto.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </Link>
                        <div className="p-4 flex flex-col flex-grow">
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{conjunto.name}</h2>
                                <p className="text-center text-gray-600">Precio: ${conjunto.precio}</p>
                                <p className="text-center text-gray-600 mb-2">stock : {conjunto.stock}</p>
                            </div>
                            <button
                                className="w-full bg-blue-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 mt-4"
                                onClick={() => handleAddToCart(conjunto)}
                            >
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default ListaDeConjuntos;
