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

    if (conjuntos.length === 0) {
        return <div><h2>No hay conjuntos disponibles</h2></div>;  // Mensaje si no hay conjuntos
    }

    // Función para añadir un conjunto al carrito
    const handleAddToCart = (conjunto) => {
        addItem(conjunto);  // Añadimos el conjunto al carrito
        console.log('Conjunto añadido al carrito:', conjunto);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 p-4">
            {conjuntos.map((conjunto) => (
                <div key={conjunto.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={conjunto.img} alt={conjunto.name} className="h-48 w-full object-cover" />
                    <div className="p-4">
                        <h3 className="text-gray-800 font-semibold text-lg">{conjunto.name}</h3>
                        <p className="text-gray-600 mt-2">Precio: ${conjunto.precio}</p>
                        <button
                            className="w-full bg-gray-800 text-white text-sm py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300"
                            onClick={() => handleAddToCart(conjunto)} // Llamamos a handleAddToCart cuando el usuario hace clic en el botón
                        >
                            Añadir al Carrito
                        </button>
                        <Link href={`/conjuntos/${conjunto.id}`}>
                            <a className="text-blue-500 hover:underline mt-2 block">Ver detalles</a>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListaDeConjuntos;
