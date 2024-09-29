'use client';
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';  // Contexto del carrito
import { getPulseraById } from '../pulserasApi';  // Función para obtener la pulsera por ID

const DetallesPulsera = ({ params }) => {
    const { pulseraId } = params;  // Obtenemos el ID de la pulsera desde los parámetros
    const [pulsera, setPulsera] = useState(null);
    const { addItem } = useContext(CartContext);  // Para añadir la pulsera al carrito

    useEffect(() => {
        const fetchPulsera = async () => {
            try {
                const data = await getPulseraById(pulseraId);  // Obtenemos la pulsera por su ID
                if (data) {
                    setPulsera(data);  // Guardamos los detalles de la pulsera en el estado
                } else {
                    console.log('Pulsera no encontrada');
                }
            } catch (error) {
                console.error('Error al obtener la pulsera:', error);
            }
        };

        fetchPulsera();
    }, [pulseraId]);

    if (!pulsera) {
        return <div><h2>Pulsera no encontrada</h2></div>;  // Mensaje si no se encuentra la pulsera
    }

    const handleAddToCart = () => {
        addItem(pulsera);  // Añadimos la pulsera al carrito
        console.log('Pulsera añadida al carrito:', pulsera);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-9/12 m-auto mt-24 mb-20">
            <div className="w-full md:flex">
                <img className="h-full w-full object-contain md:w-1/4 md:h-auto" src={pulsera.img} alt={pulsera.name} />
                <div className="w-full md:w-3/4 p-4 md:pl-8 flex flex-col justify-start items-start">
                    <h2 className="text-gray-800 font-semibold text-3xl">{pulsera.name}</h2>
                    <p className="text-gray-600 mt-2">Código: {pulsera.codigo || 'No disponible'}</p>
                    <hr className="border-gray-300 my-2 w-full" />
                    <div className="flex items-center mt-2">
                        <p className="text-gray-900 font-bold text-xl mr-4">Precio: ${pulsera.precio}</p>
                        <button onClick={handleAddToCart} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                            Agregar al carrito
                        </button>
                    </div>
                    <hr className="border-gray-300 my-2 w-full" />
                    <p className="text-gray-600 mt-2">{pulsera.descripcion}</p>
                    <p className="text-gray-600 mt-2">
                        <strong>Material:</strong> {pulsera.material}<br />
                        <strong>Tamaño:</strong> {pulsera.tamaño}<br />
                        <strong>Peso:</strong> {pulsera.peso}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DetallesPulsera;