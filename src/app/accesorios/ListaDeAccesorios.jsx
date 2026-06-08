'use client'
import { useEffect, useState, useContext } from 'react'
import { getAccesorios } from './accesoriosApi'
import Link from 'next/link'
import { CartContext } from '@/contexts/CartContext' // Importamos el contexto


const ListaDeAccesorios = () => {
    const [accesorios, setAccesorios] = useState([])
    const [loading, setLoading] = useState(true)
    const { addItem } = useContext(CartContext) // Usamos la función addItem desde el contexto

    const parsePrice = (value) => {
        const numberValue = Number(value)
        return Number.isFinite(numberValue) ? numberValue : null
    }

    useEffect(() => {
        const fetchAccesorios = async () => {
            try {
                const data = await getAccesorios() // Llamamos a la función para obtener los aros
                setAccesorios(data)
            } catch (error) {
                console.error('Error fetching aros:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAccesorios()
    }, [])

    useEffect(() => {
        // Deshabilitar clic derecho en imágenes
        const disableRightClickOnImages = (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault()
            }
        };
        document.addEventListener('contextmenu', disableRightClickOnImages);
        return () => {  // Removemos el evento al desmontar el componente   
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

    // Función para añadir un aro al carrito
    const handleAddToCart = (accesorio) => {
        addItem(accesorio) // Añadimos el aro al carrito usando la función addItem del contexto
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Accesorios</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {accesorios.map((accesorio) => {
                    const precioMayor = parsePrice(accesorio.precio_por_mayor)
                    const precioDetalle = parsePrice(accesorio.precio) ?? 0
                    const precioMayorTexto = `$${Math.round(precioMayor ?? precioDetalle)}`

                    return (
                        <div
                            key={accesorio._id}
                            className="rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <Link href={`/accesorios/${accesorio._id}`} className="block">
                                <div className="aspect-square bg-zinc-50 p-3">
                                    <img
                                        src={accesorio.img}
                                        alt={accesorio.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </Link>
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-base font-semibold text-zinc-900 line-clamp-2 min-h-[48px]">
                                    {accesorio.name}
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
                                        <span className="font-medium text-zinc-700">{accesorio.stock}</span>
                                    </div>
                                </div>
                                <button
                                    className="w-full rounded-full border border-zinc-900 bg-zinc-900 text-white py-2.5 text-sm font-medium hover:bg-zinc-800 transition-colors duration-200 mt-4"
                                    onClick={() => handleAddToCart(accesorio)}
                                >
                                    Añadir al Carrito
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default ListaDeAccesorios;
