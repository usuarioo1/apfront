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
                if (data) {
                    setPulseras(data);  // Guardamos las pulseras en el estado
                } else {
                    console.log('No se encontraron pulseras');
                }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 p-4">
            {pulseras.map((pulsera) => (
                <div key={pulsera.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={pulsera.img} alt={pulsera.name} className="h-48 w-full object-cover" />
                    <div className="p-4">
                        <h3 className="text-gray-800 font-semibold text-lg">{pulsera.name}</h3>
                        <p className="text-gray-600 mt-2">Precio: ${pulsera.precio}</p>
                        <button
                            className="w-full bg-gray-800 text-white text-sm py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300"
                            onClick={() => handleAddToCart(pulsera)} // Llamamos a handleAddToCart cuando el usuario hace clic en el botón
                        >
                            Añadir al Carrito
                        </button>
                        <Link href={`/pulseras/${pulsera.id}`}>
                            <a className="text-blue-500 hover:underline mt-2 block">Ver detalles</a>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListaDePulseras;
