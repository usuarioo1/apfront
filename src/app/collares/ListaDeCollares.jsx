'use client';
import React, { useEffect, useState, useContext } from 'react';
import { getCollares } from './collaresApi';  // Función para obtener todos los collares
import Link from 'next/link';
import { CartContext } from '@/contexts/CartContext';  // Importamos el contexto del carrito

export default function ListaDeCollares() {
    const [collares, setCollares] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext);  // Para añadir al carrito

    const parsePrice = (value) => {
        const numberValue = Number(value);
        return Number.isFinite(numberValue) ? numberValue : null;
    };

    useEffect(() => {
        const fetchCollares = async () => {
            try {
                const data = await getCollares();  // Obtenemos la lista de collares
                setCollares(data);
            } catch (error) {
                console.error('Error fetching collares:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCollares();
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
        );
    }

    // Función para añadir un collar al carrito
    const handleAddToCart = (collar) => {
        addItem(collar);  // Añadimos el producto al carrito usando la función addItem del contexto
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Collares</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {collares.map((collar) => {
                    const precioMayor = parsePrice(collar.precio_por_mayor);
                    const precioDetalle = parsePrice(collar.precio) ?? 0;
                    const precioMayorTexto = `$${Math.round(precioMayor ?? precioDetalle)}`;

                    return (
                        <div key={collar._id} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <Link href={`/collares/${collar._id}`} className="block">
                                <div className="aspect-square bg-zinc-50 p-3">
                                    <img
                                        src={collar.img}
                                        alt={collar.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </Link>
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-base font-semibold text-zinc-900 line-clamp-2 min-h-[48px]">
                                    {collar.name}
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
                                        <span className="font-medium text-zinc-700">{collar.stock}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleAddToCart(collar)}
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
}
