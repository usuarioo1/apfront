'use client';
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '@/contexts/CartContext'; // Importamos el contexto del carrito
import { getColgantesById } from '../colgantesApi'; // Función para obtener colgante por ID
import { useRouter } from 'next/router';

const DetallesColgante = ({ params }) => {
    const { colganteId } = params;  // Tomamos el ID del colgante desde los parámetros de la ruta
    const [colgante, setColgante] = useState(null);
    const { addItem } = useContext(CartContext);  // Para añadir al carrito

    useEffect(() => {
        const fetchColgante = async () => {
            try {
                const data = await getColgantesById(colganteId);  // Obtenemos el colgante por ID
                if (data) {
                    setColgante(data);  // Guardamos los detalles del colgante
                } else {
                    console.log("Colgante no encontrado");
                }
            } catch (error) {
                console.error("Error al obtener el colgante:", error);
            }
        };

        fetchColgante();
    }, [colganteId]);

    if (!colgante) {
        return <div><h2>Colgante no encontrado</h2></div>;  // Muestra un mensaje si el colgante no se encuentra
    }

    const handleAddToCart = () => {
        addItem(colgante);  // Añadimos el colgante al carrito
        console.log('Colgante añadido al carrito:', colgante);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-9/12 m-auto mt-24 mb-20">
            <div className="w-full md:flex">
                <img className="h-full w-full object-contain md:w-1/4 md:h-auto" src={colgante.img} alt={colgante.name} />
                <div className="w-full md:w-3/4 p-4 md:pl-8 flex flex-col justify-start items-start">
                    <h2 className="text-gray-800 font-semibold text-3xl">{colgante.name}</h2>
                    <p className="text-gray-600 mt-2">Código: {colgante.codigo || 'No disponible'}</p>
                    <hr className="border-gray-300 my-2 w-full" />
                    <div className="flex items-center mt-2">
                        <p className="text-gray-900 font-bold text-xl mr-4">Precio: ${colgante.precio}</p>
                        <button onClick={handleAddToCart} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300">
                            Agregar al carrito
                        </button>
                    </div>
                    <hr className="border-gray-300 my-2 w-full" />
                    <p className="text-gray-600 mt-2">{colgante.descripcion}</p>
                    
                </div>
            </div>
        </div>
    );
};

export default DetallesColgante;
