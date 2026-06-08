'use client'
import React, { useEffect, useState, useContext } from 'react'
import { getAnillos } from './anillosApi'
import Link from 'next/link'
import { CartContext } from '@/contexts/CartContext' // Importamos el contexto

export default function ListaDeAnillos() {
    const [anillos, setAnillos] = useState([])
    const [loading, setLoading] = useState(true)
    const { addItem } = useContext(CartContext) // Usamos la función addItem desde el contexto

    const parsePrice = (value) => {
        const numberValue = Number(value)
        return Number.isFinite(numberValue) ? numberValue : null
    }

    useEffect(() => {
        const fetchAnillos = async () => {
            try {
                const data = await getAnillos()
                setAnillos(data)
            } catch (error) {
                console.error('Error fetching anillos:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAnillos()
    }, [])

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
        )
    }

    // Función para añadir un anillo al carrito
    const handleAddToCart = (anillo) => {
        addItem(anillo) // Añadimos el producto al carrito usando la función addItem del contexto
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Aprovecha nuestras ofertas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {anillos.map((anillo) => {
                    const precioOferta = parsePrice(anillo.precio) ?? 0

                    return (
                        <div key={anillo._id} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <Link href={`/ofertas/${anillo._id}`} className="block">
                                <div className="aspect-square bg-zinc-50 p-3">
                                    <img
                                        src={anillo.img}
                                        alt={anillo.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </Link>
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-base font-semibold text-zinc-900 line-clamp-2 min-h-[48px]">
                                    {anillo.name}
                                </h2>
                                <div className="mt-3 space-y-2 text-sm">
                                    <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                                        <span className="text-zinc-500">Oferta</span>
                                        <span className="font-semibold text-zinc-900">${Math.round(precioOferta)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-zinc-500">Stock</span>
                                        <span className="font-medium text-zinc-700">{anillo.stock}</span>
                                    </div>
                                </div>
                                <p className="text-xs uppercase tracking-wide text-green-600 mt-3">Precio especial</p>
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleAddToCart(anillo)}
                                        className="w-full rounded-full border border-zinc-900 bg-zinc-900 text-white py-2.5 text-sm font-medium hover:bg-zinc-800 transition-colors duration-200"
                                    >
                                        Añadir al Carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}
