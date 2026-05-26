'use client';
import React, { useState, useEffect, useContext } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { CartContext } from '@/contexts/CartContext';
import { getPulseraById } from '../pulserasApi';
import { useProductSEO } from '@/utils/seo';

const DetallesPulsera = ({ params }) => {
    const { pulseraId } = params;
    const [pulsera, setPulsera] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext);

    // Hook SEO personalizado
    useProductSEO(pulsera, 'Pulseras', pulseraId);

    useEffect(() => {
        const fetchPulsera = async () => {
            setLoading(true);
            try {
                const data = await getPulseraById(pulseraId);
                if (data) {
                    setPulsera(data);
                } else {
                    console.log('Pulsera no encontrada');
                }
            } catch (error) {
                console.error('Error al obtener la pulsera:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPulsera();
    }, [pulseraId]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-700 mb-4"></div>
                <h2 className="text-2xl text-gray-600">Cargando...</h2>
            </div>
        );
    }

    if (!pulsera) {
        return <div><h2>Pulsera no encontrada</h2></div>;
    }

    const handleAddToCart = () => {
        addItem(pulsera);
        console.log('Pulsera añadida al carrito:', pulsera);
    };

<<<<<<< HEAD
    const parsePrice = (value) => {
        const numberValue = Number(value);
        return Number.isFinite(numberValue) ? numberValue : null;
    };
=======
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-9/12 m-auto mt-24 mb-20">
            <div className="w-full md:flex">
                <div className="md:w-1/4 w-full flex items-center justify-center p-4">
                    <Zoom>
                        <img
                            className="object-contain w-full h-72 md:h-80 rounded-lg cursor-zoom-in"
                            src={pulsera.img}
                            alt={pulsera.name}
                        />
                    </Zoom>
                </div>
                <div className="w-full md:w-3/4 p-4 md:pl-8 flex flex-col justify-start items-start">
                    <h2 className="text-gray-800 font-semibold text-3xl">{pulsera.name}</h2>
                    <p className="text-gray-600 mt-2">Código: {pulsera.codigo || 'No disponible'}</p>
                    <p className="text-gray-600 mt-2"> stock :{pulsera.stock}</p>
                    <hr className="border-gray-300 my-2 w-full" />
                    <div className="flex items-center mt-2">
                        <p className="text-gray-900 font-bold text-xl mr-4">Precio: ${Math.round(pulsera.precio)}</p>
>>>>>>> 5e60b9f1973f6644a1165f08fc5d480daf8228db

    const precioDetalle = parsePrice(pulsera.precio);
    const precioMayor = parsePrice(pulsera.precio_por_mayor);

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-10 bg-zinc-100 min-h-screen">
            <div className="max-w-6xl mx-auto rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
                <div className="grid md:grid-cols-[380px_1fr]">
                    <div className="bg-zinc-50 p-4 sm:p-6">
                        <Zoom>
                            <img
                                className="w-full aspect-square object-contain rounded-xl cursor-zoom-in"
                                src={pulsera.img}
                                alt={pulsera.name}
                            />
                        </Zoom>
                    </div>
                    <div className="p-5 sm:p-7 flex flex-col">
                        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">{pulsera.name}</h1>
                        <p className="text-zinc-500 mt-2 text-sm">Código: {pulsera.codigo || 'No disponible'}</p>

                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                                <span className="text-zinc-500">Precio detalle</span>
                                <span className="font-semibold text-zinc-900">
                                    {precioDetalle !== null ? `$${Math.round(precioDetalle)}` : 'No disponible'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                                <span className="text-zinc-500">Precio por mayor</span>
                                <span className="font-semibold text-zinc-900">
                                    {precioMayor !== null ? `$${Math.round(precioMayor)}` : 'No disponible'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-500">Stock</span>
                                <span className="font-medium text-zinc-700">{pulsera.stock}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="mt-5 w-full sm:w-auto rounded-full border border-zinc-900 bg-zinc-900 text-white py-2.5 px-6 text-sm font-medium hover:bg-zinc-800 transition-colors duration-200"
                        >
                            Agregar al carrito
                        </button>

                        <div className="mt-5 pt-4 border-t border-zinc-100">
                            <p className="text-sm leading-relaxed text-zinc-600">{pulsera.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetallesPulsera;
