'use client'
import { useEffect, useState, useContext } from 'react'
import { getAccesorios } from './accesoriosApi'
import Link from 'next/link'
import { CartContext } from '@/contexts/CartContext' // Importamos el contexto


const ListaDeAccesorios = () => {
    const [accesorios, setAccesorios] = useState([])
    const [loading, setLoading] = useState(true)
    const { addItem } = useContext(CartContext) // Usamos la función addItem desde el contexto

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
                {accesorios.map((accesorio) => (
                    <div
                        key={accesorio._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
                    >
                        <Link href={`/accesorios/${accesorio._id}`}>
                            <div className="aspect-square relative">
                                <img
                                    src={accesorio.img}
                                    alt={accesorio.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </Link>
                        <div className="p-4 flex flex-col flex-grow">
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{accesorio.name}</h2>
                                <p className="text-center text-gray-600">Precio al detalle: ${accesorio.precio}</p>
                                <strong>
                                    <p className="text-center text-gray-600">
                                        Precio por mayor: ${Math.round(accesorio.precio / 1.5)}
                                    </p>
                                </strong>
                                <p className="text-center text-gray-600 mb-2">stock : {accesorio.stock}</p>
                            </div>
                            <button
                                className="w-full bg-blue-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 mt-4"
                                onClick={() => handleAddToCart(accesorio)}
                            >
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default ListaDeAccesorios;
