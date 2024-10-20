'use client';
import React, { useEffect, useState, useContext } from 'react';
import { getPulseras } from './pulserasApi';  // Función para obtener la lista de pulseras
import Link from 'next/link';
import { CartContext } from '@/contexts/CartContext'; // Importamos el contexto

const ListaDePulseras = () => {
    const [pulseras, setPulseras] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const { addItem } = useContext(CartContext); // Usamos la función addItem desde el contexto

    useEffect(() => {
        const fetchPulseras = async () => {
            try {
                const data = await getPulseras();  // Obtenemos la lista de pulseras
                setPulseras(data);  // Guardamos las pulseras en el estado
            } catch (error) {
                console.error('Error al obtener las pulseras:', error);
            } finally {
                setLoading(false); // Finalizamos la carga
            }
        };

        fetchPulseras();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );  // Mensaje de carga
    }

    if (pulseras.length === 0) {
        return <div><h2>No hay pulseras disponibles</h2></div>;  // Mensaje si no hay pulseras
    }

    // Función para añadir una pulsera al carrito
    const handleAddToCart = (pulsera) => {
        addItem(pulsera);  // Añadimos la pulsera al carrito
        console.log('Pulsera añadida al carrito:', pulsera);
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Pulseras</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {pulseras.map((pulsera) => (
                    <div key={pulsera._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <Link href={`/pulseras/${pulsera._id}`}>
                            <div className="aspect-square relative">
                                <img
                                    src={pulsera.img}
                                    alt={pulsera.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </Link>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{pulsera.name}</h2>
                            <p className="text-center text-gray-600 mb-4">Precio: ${pulsera.precio}</p>
                            <button
                                className="w-full bg-blue-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                onClick={() => handleAddToCart(pulsera)} // Llamamos a handleAddToCart cuando el usuario hace clic en el botón
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

export default ListaDePulseras;
