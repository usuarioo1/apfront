'use client';
import React, { useEffect, useState, useContext } from 'react';
import { getFiguras } from './figurasApi'; // Función para obtener la lista de figuras
import Link from 'next/link';
import { CartContext } from '@/contexts/CartContext'; // Importamos el contexto

const ListaDeFiguras = () => {
    const [figuras, setFiguras] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const { addItem } = useContext(CartContext); // Usamos la función addItem desde el contexto

    const parsePrice = (value) => {
        const numberValue = Number(value);
        return Number.isFinite(numberValue) ? numberValue : null;
    };

    useEffect(() => {
        const fetchFiguras = async () => {
            try {
                const data = await getFiguras(); // Obtenemos la lista de figuras
                setFiguras(data);
            } catch (error) {
                console.error('Error al obtener las figuras:', error);
            } finally {
                setLoading(false); // Finalizamos la carga
            }
        };

        fetchFiguras();
    }, []);

    useEffect(() => {
        // Deshabilitar clic derecho en imágenes
        const disableRightClickOnImages = (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', disableRightClickOnImages);

        return () => {
            document.removeEventListener('contextmenu', disableRightClickOnImages);
        };
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        ); // Mensaje de carga
    }

    if (figuras.length === 0) {
        return <div><h2>No hay figuras disponibles</h2></div>; // Mensaje si no hay figuras
    }

    // Función para añadir una figura al carrito
    const handleAddToCart = (figura) => {
        addItem(figura); // Añadimos la figura al carrito
        console.log('Figura añadida al carrito:', figura);
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Figuras</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {figuras.map((figura) => {
                    const precioMayor = parsePrice(figura.precio_por_mayor);
                    const precioDetalle = parsePrice(figura.precio) ?? 0;
                    const precioMayorTexto = `$${Math.round(precioMayor ?? precioDetalle)}`;

                    return (
                        <div key={figura.id} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <Link href={`/figuras/${figura._id}`} className="block">
                                <div className="aspect-square bg-zinc-50 p-3">
                                    <img
                                        src={figura.img}
                                        alt={figura.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </Link>
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-base font-semibold text-zinc-900 line-clamp-2 min-h-[48px]">
                                    {figura.name}
                                </h2>
                                <div className="mt-3 space-y-2 text-sm">
                                    <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                                        <span className="text-zinc-500">Detalle</span>
                                        <span className="font-semibold text-zinc-900">${Math.round(precioDetalle)}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                                        <span className="text-zinc-500">Mayor</span>
                                        <span className="font-semibold text-zinc-900">{precioMayorTexto}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-zinc-500">Stock</span>
                                        <span className="font-medium text-zinc-700">{figura.stock}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleAddToCart(figura)}
                                        className="w-full rounded-full border border-zinc-900 bg-zinc-900 text-white py-2.5 text-sm font-medium hover:bg-zinc-800 transition-colors duration-200"
                                    >
                                        Añadir al Carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    );
};

export default ListaDeFiguras;
