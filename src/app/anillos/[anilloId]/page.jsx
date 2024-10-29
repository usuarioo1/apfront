'use client';
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';
import { getAnilloById } from '../anillosApi'; // Supongamos que existe esta función para obtener el anillo por ID

const DetallesAnillo = ({ params }) => {
    const { anilloId } = params;  // Tomamos el id del anillo desde los parámetros de la ruta
    const [anillo, setAnillo] = useState(null);
    const { addItem } = useContext(CartContext);  // Para añadir al carrito

    useEffect(() => {
        const fetchAnillo = async () => {
            try {
                const data = await getAnilloById(anilloId);  // Suponemos que esta función obtiene el anillo por ID
                if (data) {
                    setAnillo(data);  // Guardamos los detalles del anillo
                } else {
                    console.log("Anillo no encontrado");
                }
            } catch (error) {
                console.error("Error al obtener el anillo:", error);
            }
        };

        fetchAnillo();
    }, [anilloId]);

    if (!anillo) {
        return <div><h2>Anillo no encontrado</h2></div>;  // Muestra un mensaje si el anillo no se encuentra
    }

    const handleAddToCart = () => {
        addItem(anillo);  // Añadimos el anillo al carrito
        console.log('Anillo añadido al carrito:', anillo);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-9/12 m-auto mt-24 mb-20">
            <div className="w-full md:flex">
                <img className="h-full w-full object-contain md:w-1/4 md:h-auto" src={anillo.img} alt={anillo.name} />
                <div className="w-full md:w-3/4 p-4 md:pl-8 flex flex-col justify-start items-start">
                    <h2 className="text-gray-800 font-semibold text-3xl">{anillo.name}</h2>
                    <p className="text-gray-600 mt-2">Código: {anillo.codigo || 'No disponible'}</p>
                    <p className="text-gray-600 mt-2"> stock :{anillo.stock}</p>
                    <hr className="border-gray-300 my-2 w-full" />
                    <div className="flex items-center mt-2">
                        <p className="text-gray-900 font-bold text-xl mr-4">Precio: ${anillo.precio}</p>
                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
                        >
                            Agregar al carrito
                        </button>

                    </div>
                    <hr className="border-gray-300 my-2 w-full" />
                    <p className="text-gray-600 mt-2">{anillo.descripcion}</p>
                </div>
            </div>
        </div>
    );
};

export default DetallesAnillo;
