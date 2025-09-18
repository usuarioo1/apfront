'use client';
import React, { useState, useEffect, useContext } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { CartContext } from '@/contexts/CartContext';
import { getConjuntoById } from '../conjuntosApi';  // Función para obtener el conjunto por ID

const DetallesConjunto = ({ params }) => {
    const { conjuntoId } = params;  // Tomamos el ID del conjunto desde los parámetros de la ruta
    const [conjunto, setConjunto] = useState(null);
    const { addItem } = useContext(CartContext);  // Para añadir el conjunto al carrito

    useEffect(() => {
        const fetchConjunto = async () => {
            try {
                const data = await getConjuntoById(conjuntoId);  // Obtenemos el conjunto por su ID
                if (data) {
                    setConjunto(data);  // Guardamos los detalles del conjunto
                } else {
                    console.log('Conjunto no encontrado');
                }
            } catch (error) {
                console.error('Error al obtener el conjunto:', error);
            }
        };

        fetchConjunto();
    }, [conjuntoId]);

    if (!conjunto) {
        return <div><h2>Conjunto no encontrado</h2></div>;  // Muestra un mensaje si no se encuentra el conjunto
    }

    const handleAddToCart = () => {
        addItem(conjunto);  // Añadimos el conjunto al carrito
        console.log('Conjunto añadido al carrito:', conjunto);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-9/12 m-auto mt-24 mb-20">
            <div className="w-full md:flex">
                <div className="md:w-1/4 w-full flex items-center justify-center p-4">
                    <Zoom>
                        <img
                            className="object-contain w-full h-72 md:h-80 rounded-lg cursor-zoom-in"
                            src={conjunto.img}
                            alt={conjunto.name}
                            onContextMenu={(e) => e.preventDefault()}
                        />
                    </Zoom>
                </div>
                <div className="w-full md:w-3/4 p-4 md:pl-8 flex flex-col justify-start items-start">
                    <h2 className="text-gray-800 font-semibold text-3xl">{conjunto.name}</h2>
                    <p className="text-gray-600 mt-2">Código: {conjunto.codigo || 'No disponible'}</p>
                    <p className="text-gray-600 mt-2"> stock :{conjunto.stock}</p>
                    <hr className="border-gray-300 my-2 w-full" />
                    <div className="flex items-center mt-2">
                        <p className="text-gray-900 font-bold text-xl mr-4">Precio: ${conjunto.precio}</p>
                        <button onClick={handleAddToCart} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300">
                            Agregar al carrito
                        </button>
                    </div>
                    <hr className="border-gray-300 my-2 w-full" />
                    <strong><p className="text-gray-900 font-bold text-xl mr-4">Por mayor: ${Math.round(conjunto.precio/1.5)}</p></strong>
                    <hr className="border-gray-300 my-2 w-full" />
                    <p className="text-gray-600 mt-2">{conjunto.descripcion}</p>
                    
                </div>
            </div>
        </div>
    );
};

export default DetallesConjunto;
