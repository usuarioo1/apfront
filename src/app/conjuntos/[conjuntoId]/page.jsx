'use client';
import React, { useState, useEffect, useContext } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { CartContext } from '@/contexts/CartContext';
import { getConjuntoById } from '../conjuntosApi';  // Función para obtener el conjunto por ID

const DetallesConjunto = ({ params }) => {
    const { conjuntoId } = params;  // Tomamos el ID del conjunto desde los parámetros de la ruta
    const [conjunto, setConjunto] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext);  // Para añadir el conjunto al carrito

    useEffect(() => {
        const fetchConjunto = async () => {
            setLoading(true);
            try {
                const data = await getConjuntoById(conjuntoId);  // Obtenemos el conjunto por su ID
                if (data) {
                    setConjunto(data);  // Guardamos los detalles del conjunto
                } else {
                    console.log('Conjunto no encontrado');
                }
            } catch (error) {
                console.error('Error al obtener el conjunto:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchConjunto();
    }, [conjuntoId]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-700 mb-4"></div>
                <h2 className="text-2xl text-gray-600">Cargando...</h2>
            </div>
        );
    }
    if (!conjunto) {
        return <div><h2>Conjunto no encontrado</h2></div>;  // Muestra un mensaje si no se encuentra el conjunto
    }

    const handleAddToCart = () => {
        addItem(conjunto);  // Añadimos el conjunto al carrito
        console.log('Conjunto añadido al carrito:', conjunto);
    };

    const precioMayor = Number(conjunto.precio_por_mayor);
    const precioDetalle = Number(conjunto.precio);
    const precioMayorFinal = Number.isFinite(precioMayor) ? precioMayor : (Number.isFinite(precioDetalle) ? precioDetalle : 0);

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-10 bg-zinc-100 min-h-screen">
            <div className="max-w-6xl mx-auto rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
                <div className="grid md:grid-cols-[380px_1fr]">
                    <div className="bg-zinc-50 p-4 sm:p-6">
                        <Zoom>
                            <img
                                className="w-full aspect-square object-contain rounded-xl cursor-zoom-in"
                                src={conjunto.img}
                                alt={conjunto.name}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </Zoom>
                    </div>
                    <div className="p-5 sm:p-7 flex flex-col">
                        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">{conjunto.name}</h1>
                        <p className="text-zinc-500 mt-2 text-sm">Código: {conjunto.codigo || 'No disponible'}</p>

                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                                <span className="text-zinc-500">Detalle</span>
                                <span className="font-semibold text-zinc-900">${Math.round(conjunto.precio)}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                                <span className="text-zinc-500">Mayor</span>
                                <span className="font-semibold text-zinc-900">${Math.round(precioMayorFinal)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-500">Stock</span>
                                <span className="font-medium text-zinc-700">{conjunto.stock}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="mt-5 w-full sm:w-auto rounded-full border border-zinc-900 bg-zinc-900 text-white py-2.5 px-6 text-sm font-medium hover:bg-zinc-800 transition-colors duration-200"
                        >
                            Agregar al carrito
                        </button>

                        <div className="mt-5 pt-4 border-t border-zinc-100">
                            <p className="text-sm leading-relaxed text-zinc-600">{conjunto.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetallesConjunto;
