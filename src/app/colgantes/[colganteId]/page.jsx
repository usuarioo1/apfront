'use client';
import React, { useState, useEffect, useContext } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { CartContext } from '@/contexts/CartContext'; // Importamos el contexto del carrito
import { getColgantesById } from '../colgantesApi'; // Función para obtener colgante por ID
import { useRouter } from 'next/router';

const DetallesColgante = ({ params }) => {
    const { colganteId } = params; // Tomamos el ID del colgante desde los parámetros de la ruta
    const [colgante, setColgante] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext); // Para añadir al carrito

    useEffect(() => {
        const fetchColgante = async () => {
            setLoading(true);
            try {
                const data = await getColgantesById(colganteId); // Obtenemos el colgante por ID
                if (data) {
                    setColgante(data); // Guardamos los detalles del colgante
                } else {
                    console.log('Colgante no encontrado');
                }
            } catch (error) {
                console.error('Error al obtener el colgante:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchColgante();
    }, [colganteId]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-700 mb-4"></div>
                <h2 className="text-2xl text-gray-600">Cargando...</h2>
            </div>
        );
    }
    if (!colgante) {
        return (
            <div>
                <h2>Colgante no encontrado</h2>
            </div>
        ); // Muestra un mensaje si el colgante no se encuentra
    }

    const handleAddToCart = () => {
        addItem(colgante); // Añadimos el colgante al carrito
        console.log('Colgante añadido al carrito:', colgante);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-9/12 m-auto mt-24 mb-20">
            <div className="w-full md:flex">
                <div className="md:w-1/4 w-full flex items-center justify-center p-4">
                    <Zoom>
                        <img
                            className="object-contain w-full h-72 md:h-80 rounded-lg cursor-zoom-in"
                            src={colgante.img}
                            alt={colgante.name}
                            onContextMenu={(e) => e.preventDefault()} // Deshabilitar menú contextual en la imagen
                        />
                    </Zoom>
                </div>
                <div className="w-full md:w-3/4 p-4 md:pl-8 flex flex-col justify-start items-start">
                    <h2 className="text-gray-800 font-semibold text-3xl">{colgante.name}</h2>
                    <p className="text-gray-600 mt-2">Código: {colgante.codigo || 'No disponible'}</p>
                    <p className="text-gray-600 mt-2">Stock: {colgante.stock}</p>
                    <hr className="border-gray-300 my-2 w-full" />
                    <div className="flex items-center mt-2">
                        <p className="text-gray-900 font-bold text-xl mr-4">Precio: ${colgante.precio}</p>
                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
                        >
                            Agregar al carrito
                        </button>
                    </div>
                    <hr className="border-gray-300 my-2 w-full" />
                    <strong>
                        <p className="text-gray-900 font-bold text-xl mr-4">
                            Por mayor: ${Math.round(colgante.precio / 1.5)}
                        </p>
                    </strong>
                    <hr className="border-gray-300 my-2 w-full" />
                    <p className="text-gray-600 mt-2">{colgante.descripcion}</p>
                </div>
            </div>
        </div>
    );
};

export default DetallesColgante;
