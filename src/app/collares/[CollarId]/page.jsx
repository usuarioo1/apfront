'use client';
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';
import { getCollaresById } from '../collaresApi';  // Función para obtener el collar por ID

const DetallesCollar = ({ params }) => {
    const { collarId } = params;  // Tomamos el ID del collar desde los parámetros de la ruta
    const [collar, setCollar] = useState(null);
    const { addItem } = useContext(CartContext);  // Para añadir el collar al carrito

    useEffect(() => {
        const fetchCollar = async () => {
            try {
                const data = await getCollaresById(collarId);  // Obtenemos el collar por su ID
                if (data) {
                    setCollar(data);  // Guardamos los detalles del collar en el estado
                } else {
                    console.log('Collar no encontrado');
                }
            } catch (error) {
                console.error('Error al obtener el collar:', error);
            }
        };

        fetchCollar();
    }, [collarId]);

    if (!collar) {
        return <div><h2>Collar no encontrado</h2></div>;  // Muestra un mensaje si el collar no se encuentra
    }

    const handleAddToCart = () => {
        addItem(collar);  // Añadimos el collar al carrito
        console.log('Collar añadido al carrito:', collar);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-9/12 m-auto mt-24 mb-20">
            <div className="w-full md:flex">
                <img className="h-full w-full object-contain md:w-1/4 md:h-auto" src={collar.img} alt={collar.name} />
                <div className="w-full md:w-3/4 p-4 md:pl-8 flex flex-col justify-start items-start">
                    <h2 className="text-gray-800 font-semibold text-3xl">{collar.name}</h2>
                    <p className="text-gray-600 mt-2">Código: {collar.codigo || 'No disponible'}</p>
                    <hr className="border-gray-300 my-2 w-full" />
                    <div className="flex items-center mt-2">
                        <p className="text-gray-900 font-bold text-xl mr-4">Precio: ${collar.precio}</p>
                        <button onClick={handleAddToCart}className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300">
                            Agregar al carrito
                        </button>
                    </div>
                    <hr className="border-gray-300 my-2 w-full" />
                    <p className="text-gray-600 mt-2">{collar.descripcion}</p>
                    
                </div>
            </div>
        </div>
    );
};

export default DetallesCollar;
