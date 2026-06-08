'use client'
import { useState, useEffect, useContext } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { CartContext } from '@/contexts/CartContext';
import { getAccesoriosById } from '../accesoriosApi';


const DetallesAccesorios = ({ params }) => {

    const { accesoriosId } = params;  // Tomamos el id del aro desde los parámetros de la ruta
    const [accesorio, setAccesorio] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext);  // Para añadir al carrito

    useEffect(() => {
        const fetchAccesorio = async () => {
            setLoading(true);
            try {
                const data = await getAccesoriosById(accesoriosId);  // Llamamos a la función para obtener los detalles del aro por ID
                if (data) {
                    setAccesorio(data);  // Guardamos los detalles del aro
                } else {
                    console.log("Accesorio no encontrado");
                }
            } catch (error) {
                console.error("Error al obtener el acceosrio:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAccesorio();
    }, [accesoriosId]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-700 mb-4"></div>
                <h2 className="text-2xl text-gray-600">Cargando...</h2>
            </div>
        );
    }
    if (!accesorio) {
        return <div><h2>Accesorio no encontrado</h2></div>;  // Muestra un mensaje si el aro no se encuentra
    }

    const handleAddToCart = () => {
        addItem(accesorio);  // Añadimos el accesorio al carrito
        console.log('Accesorio añadido al carrito:', accesorio);
    };

    const precioMayor = Number(accesorio.precio_por_mayor);
    const precioDetalle = Number(accesorio.precio);
    const precioMayorFinal = Number.isFinite(precioMayor) ? precioMayor : (Number.isFinite(precioDetalle) ? precioDetalle : 0);


    return (
        <div className="px-4 sm:px-6 lg:px-8 py-10 bg-zinc-100 min-h-screen">
            <div className="max-w-6xl mx-auto rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
                <div className="grid md:grid-cols-[380px_1fr]">
                    <div className="bg-zinc-50 p-4 sm:p-6">
                        <Zoom>
                            <img
                                className="w-full aspect-square object-contain rounded-xl cursor-zoom-in"
                                src={accesorio.img}
                                alt={accesorio.name}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </Zoom>
                    </div>
                    <div className="p-5 sm:p-7 flex flex-col">
                        <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900">{accesorio.name}</h1>
                        <p className="text-zinc-500 mt-2 text-sm">Código: {accesorio.codigo || 'No disponible'}</p>

                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                                <span className="text-zinc-500">Detalle</span>
                                <span className="font-semibold text-zinc-900">${Math.round(accesorio.precio)}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                                <span className="text-zinc-500">Mayor</span>
                                <span className="font-semibold text-zinc-900">${Math.round(precioMayorFinal)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-500">Stock</span>
                                <span className="font-medium text-zinc-700">{accesorio.stock}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="mt-5 w-full sm:w-auto rounded-full border border-zinc-900 bg-zinc-900 text-white py-2.5 px-6 text-sm font-medium hover:bg-zinc-800 transition-colors duration-200"
                        >
                            Agregar al carrito
                        </button>

                        <div className="mt-5 pt-4 border-t border-zinc-100">
                            <p className="text-sm leading-relaxed text-zinc-600">{accesorio.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetallesAccesorios;
