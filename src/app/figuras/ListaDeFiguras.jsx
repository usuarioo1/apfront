'use client';
import React, { useEffect, useState, useContext } from 'react';
import { getFiguras } from './figurasApi'; // Función para obtener la lista de figuras
import Link from 'next/link';
import { CartContext } from '@/contexts/CartContext'; // Importamos el contexto

const ListaDeFiguras = () => {
    const [figuras, setFiguras] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const { addItem } = useContext(CartContext); // Usamos la función addItem desde el contexto

    useEffect(() => {
        const fetchFiguras = async () => {
            try {
                const data = await getFiguras(); // Obtenemos la lista de figuras
                setFiguras(data);
            } catch (error) {
                console.error('Error al obtener las figuras:', error);
            } finally {
                setLoading(false); // Finalizamos la carga
            }
        };

        fetchFiguras();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        ); // Mensaje de carga
    }

    if (figuras.length === 0) {
        return <div><h2>No hay figuras disponibles</h2></div>; // Mensaje si no hay figuras
    }

    // Función para añadir una figura al carrito
    const handleAddToCart = (figura) => {
        addItem(figura); // Añadimos la figura al carrito
        console.log('Figura añadida al carrito:', figura);
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Figuras</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {figuras.map((figura) => (
                    <div key={figura.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <Link href={`/figuras/${figura._id}`}>
                            <div className="aspect-square relative">
                                <img
                                    src={figura.img}
                                    alt={figura.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </Link>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{figura.name}</h2>
                            <p className="text-center text-gray-600 mb-4">Precio: ${figura.precio}</p>
                            <button
                                className="w-full bg-blue-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                onClick={() => handleAddToCart(figura)} // Llamamos a handleAddToCart cuando el usuario hace clic en el botón
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

export default ListaDeFiguras;
