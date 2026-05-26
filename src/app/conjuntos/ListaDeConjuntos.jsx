'use client';
import React, { useEffect, useState, useContext } from 'react';
import { getConjuntos } from './conjuntosApi'; // Función para obtener la lista de conjuntos
import Link from 'next/link';
import { CartContext } from '@/contexts/CartContext'; // Importamos el contexto

const ListaDeConjuntos = () => {
    const [conjuntos, setConjuntos] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const { addItem } = useContext(CartContext); // Usamos la función addItem desde el contexto

    const parsePrice = (value) => {
        const numberValue = Number(value);
        return Number.isFinite(numberValue) ? numberValue : null;
    };

    useEffect(() => {
        const fetchConjuntos = async () => {
            try {
                const data = await getConjuntos();  // Obtenemos la lista de conjuntos
                if (data) {
                    setConjuntos(data);  // Guardamos los conjuntos en el estado
                } else {
                    console.log('No se encontraron conjuntos');
                }
            } catch (error) {
                console.error('Error al obtener los conjuntos:', error);
            } finally {
                setLoading(false); // Finalizamos la carga
            }
        };

        fetchConjuntos();
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

    // Función para añadir un conjunto al carrito
    const handleAddToCart = (conjunto) => {
        addItem(conjunto);  // Añadimos el conjunto al carrito
        console.log('Conjunto añadido al carrito:', conjunto);
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen mb-5">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Conjuntos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {conjuntos.map((conjunto) => {
                    const precioMayor = parsePrice(conjunto.precio_por_mayor);
                    const precioDetalle = parsePrice(conjunto.precio) ?? 0;
                    const precioMayorTexto = `$${Math.round(precioMayor ?? precioDetalle)}`;

                    return (
                        <div key={conjunto._id} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <Link href={`/conjuntos/${conjunto._id}`} className="block">
                                <div className="aspect-square bg-zinc-50 p-3">
                                    <img
                                        src={conjunto.img}
                                        alt={conjunto.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </Link>
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-base font-semibold text-zinc-900 line-clamp-2 min-h-[48px]">
                                    {conjunto.name}
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
                                        <span className="font-medium text-zinc-700">{conjunto.stock}</span>
                                    </div>
                                </div>
                                <p className="text-xs uppercase tracking-wide text-zinc-400 mt-3">No incluye cadena</p>
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleAddToCart(conjunto)}
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

export default ListaDeConjuntos;
