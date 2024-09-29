'use client';
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';
import { getArosById } from '../arosApi'; // Usamos la función para obtener el aro por ID

const DetallesAro = ({ params }) => {
    const { aroId } = params;  // Tomamos el id del aro desde los parámetros de la ruta
    const [aro, setAro] = useState(null);
    const { addItem } = useContext(CartContext);  // Para añadir al carrito

    useEffect(() => {
        const fetchAro = async () => {
            try {
                const data = await getArosById(aroId);  // Llamamos a la función para obtener los detalles del aro por ID
                if (data) {
                    setAro(data);  // Guardamos los detalles del aro
                } else {
                    console.log("Aro no encontrado");
                }
            } catch (error) {
                console.error("Error al obtener el aro:", error);
            }
        };

        fetchAro();
    }, [aroId]);

    if (!aro) {
        return <div><h2>Aro no encontrado</h2></div>;  // Muestra un mensaje si el aro no se encuentra
    }

    const handleAddToCart = () => {
        addItem(aro);  // Añadimos el aro al carrito
        console.log('Aro añadido al carrito:', aro);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-9/12 m-auto mt-24 mb-20">
            <div className="w-full md:flex">
                <img className="h-full w-full object-contain md:w-1/4 md:h-auto" src={aro.img} alt={aro.name} />
                <div className="w-full md:w-3/4 p-4 md:pl-8 flex flex-col justify-start items-start">
                    <h2 className="text-gray-800 font-semibold text-3xl">{aro.name}</h2>
                    <p className="text-gray-600 mt-2">Código: {aro.codigo || 'No disponible'}</p>
                    <hr className="border-gray-300 my-2 w-full" />
                    <div className="flex items-center mt-2">
                        <p className="text-gray-900 font-bold text-xl mr-4">Precio: ${aro.precio}</p>
                        <button onClick={handleAddToCart} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">Agregar al carrito</button>
                    </div>
                    <hr className="border-gray-300 my-2 w-full" />
                    <p className="text-gray-600 mt-2">{aro.descripcion}</p>
                    <p className="text-gray-600 mt-2">
                        <strong>Material:</strong> {aro.material}<br />
                        <strong>Tamaño:</strong> {aro.tamaño}<br />
                        <strong>Peso:</strong> {aro.peso}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DetallesAro;
