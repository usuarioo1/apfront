'use client';
import React, { useEffect, useState, useContext } from 'react';
import { getColgantes } from './colgantesApi'; // Función para obtener todos los colgantes
import Link from 'next/link';
import { CartContext } from '@/contexts/CartContext'; // Importamos el contexto del carrito

export default function ListaDeColgantes() {
    const [colgantes, setColgantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext); // Usamos la función addItem desde el contexto

    const parsePrice = (value) => {
        const numberValue = Number(value);
        return Number.isFinite(numberValue) ? numberValue : null;
    };

    useEffect(() => {
        const fetchColgantes = async () => {
            try {
                const data = await getColgantes();
                setColgantes(data);
            } catch (error) {
                console.error('Error fetching colgantes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchColgantes();
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

    // Función para añadir un colgante al carrito
    const handleAddToCart = (colgante) => {
        addItem(colgante); // Añadimos el producto al carrito usando la función addItem del contexto
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Colgantes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {colgantes.map((colgante) => {
                    const precioMayor = parsePrice(colgante.precio_por_mayor);
                    const precioDetalle = parsePrice(colgante.precio) ?? 0;
                    const precioMayorTexto = `$${Math.round(precioMayor ?? precioDetalle)}`;

                    return (
                        <div key={colgante._id} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <Link href={`/colgantes/${colgante._id}`} className="block">
                                <div className="aspect-square bg-zinc-50 p-3">
                                    <img
                                        src={colgante.img}
                                        alt={colgante.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </Link>
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-base font-semibold text-zinc-900 line-clamp-2 min-h-[48px]">
                                    {colgante.name}
                                </h2>
                                <div className="mt-3 space-y-2 text-sm">
                                    <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                                        <span className="text-zinc-500">Detalle</span>
                                        <span className="font-semibold text-zinc-900">${Math.round(colgante.precio)}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                                        <span className="text-zinc-500">Mayor</span>
                                        <span className="font-semibold text-zinc-900">{precioMayorTexto}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-zinc-500">Stock</span>
                                        <span className="font-medium text-zinc-700">{colgante.stock}</span>
                                    </div>
                                </div>
                                <p className="text-xs uppercase tracking-wide text-zinc-400 mt-3">No incluye cadena</p>
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleAddToCart(colgante)}
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
