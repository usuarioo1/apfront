'use client';
import React, { useState, useEffect, useContext } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { CartContext } from '@/contexts/CartContext';  // Contexto del carrito
import { getFiguraById } from '../figurasApi';  // Función para obtener la figura por ID

const DetallesFigura = ({ params }) => {
    const { figuraId } = params;  // Obtenemos el ID de la figura desde los parámetros
    const [figura, setFigura] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext);  // Para añadir la figura al carrito

    useEffect(() => {
        const fetchFigura = async () => {
            setLoading(true);
            try {
                const data = await getFiguraById(figuraId);  // Obtenemos la figura por su ID
                if (data) {
                    setFigura(data);  // Guardamos los detalles de la figura en el estado
                } else {
                    console.log('Figura no encontrada');
                }
            } catch (error) {
                console.error('Error al obtener la figura:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFigura();
    }, [figuraId]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-700 mb-4"></div>
                <h2 className="text-2xl text-gray-600">Cargando...</h2>
            </div>
        );
    }
    if (!figura) {
        return <div><h2>Figura no encontrada</h2></div>;  // Mensaje si no se encuentra la figura
    }

    const handleAddToCart = () => {
        addItem(figura);  // Añadimos la figura al carrito
        console.log('Figura añadida al carrito:', figura);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-9/12 m-auto mt-24 mb-20">
            <div className="w-full md:flex">
                <div className="md:w-1/4 w-full flex items-center justify-center p-4">
                    <Zoom>
                        <img
                            className="object-contain w-full h-72 md:h-80 rounded-lg cursor-zoom-in"
                            src={figura.img}
                            alt={figura.name}
                        />
                    </Zoom>
                </div>
                <div className="w-full md:w-3/4 p-4 md:pl-8 flex flex-col justify-start items-start">
                    <h2 className="text-gray-800 font-semibold text-3xl">{figura.name}</h2>
                    <p className="text-gray-600 mt-2">Código: {figura.codigo || 'No disponible'}</p>
                    <p className="text-gray-600 mt-2"> stock :{figura.stock}</p>
                    <hr className="border-gray-300 my-2 w-full" />
                    <div className="flex items-center mt-2">
                        <p className="text-gray-900 font-bold text-xl mr-4">Precio: ${figura.precio}</p>
                        <button onClick={handleAddToCart} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300">
                            Agregar al carrito
                        </button>
                    </div>
                    <hr className="border-gray-300 my-2 w-full" />
                    <strong><p className="text-gray-900 font-bold text-xl mr-4">Por mayor: ${Math.round(figura.precio/1.5)}</p></strong>
                    <hr className="border-gray-300 my-2 w-full" />
                    <p className="text-gray-600 mt-2">{figura.descripcion}</p>
                    
                </div>
            </div>
        </div>
    );
};

export default DetallesFigura;
