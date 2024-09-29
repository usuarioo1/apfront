'use client';
import React, { useEffect, useState, useContext } from 'react';
import { getFiguras } from './figurasApi';  // Función para obtener la lista de figuras
import Link from 'next/link';
import { CartContext } from '@/contexts/CartContext'; // Importamos el contexto

const ListaDeFiguras = () => {
    const [figuras, setFiguras] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const { addItem } = useContext(CartContext); // Usamos la función addItem desde el contexto

    useEffect(() => {
        const fetchFiguras = async () => {
            try {
                const data = await getFiguras();  // Obtenemos la lista de figuras
                if (data) {
                    setFiguras(data);  // Guardamos las figuras en el estado
                } else {
                    console.log('No se encontraron figuras');
                }
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
        );  // Mensaje de carga
    }

    if (figuras.length === 0) {
        return <div><h2>No hay figuras disponibles</h2></div>;  // Mensaje si no hay figuras
    }

    // Función para añadir una figura al carrito
    const handleAddToCart = (figura) => {
        addItem(figura);  // Añadimos la figura al carrito
        console.log('Figura añadida al carrito:', figura);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 p-4">
            {figuras.map((figura) => (
                <div key={figura.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={figura.img} alt={figura.name} className="h-48 w-full object-cover" />
                    <div className="p-4">
                        <h3 className="text-gray-800 font-semibold text-lg">{figura.name}</h3>
                        <p className="text-gray-600 mt-2">Precio: ${figura.precio}</p>
                        <button
                            className="w-full bg-gray-800 text-white text-sm py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300"
                            onClick={() => handleAddToCart(figura)} // Llamamos a handleAddToCart cuando el usuario hace clic en el botón
                        >
                            Añadir al Carrito
                        </button>
                        <Link href={`/figuras/${figura.id}`}>
                            <a className="text-blue-500 hover:underline mt-2 block">Ver detalles</a>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListaDeFiguras;
