'use client'
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';
import { getAccesoriosById } from '../accesoriosApi';


const DetallesAccesorios = () => {

    const { accesoriosId } = params;  // Tomamos el id del aro desde los parámetros de la ruta
    const [accesorio, setAccesorio] = useState(null);
    const { addItem } = useContext(CartContext);  // Para añadir al carrito

    useEffect(() => {
        const fetchAccesorio = async () => {
            try {
                const data = await getAccesoriosById(accesoriosId);  // Llamamos a la función para obtener los detalles del aro por ID
                if (data) {
                    setAccesorio(data);  // Guardamos los detalles del aro
                } else {
                    console.log("Accesorio no encontrado");
                }
            } catch (error) {
                console.error("Error al obtener el acceosrio:", error);
            }
        };

        fetchAccesorio();
    }, [accesoriosId]);

    if (!accesorio) {
        return <div><h2>Accesorio no encontrado</h2></div>;  // Muestra un mensaje si el aro no se encuentra
    }

    const handleAddToCart = () => {
        addItem(accesorio);  // Añadimos el aro al carrito
        console.log('Aro añadido al carrito:', aro);
    };


    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-9/12 m-auto mt-24 mb-20">
            <div className="w-full md:flex">
                <img className="h-full w-full object-contain md:w-1/4 md:h-auto" src={accesorio.img} alt={accesorio.name} />
                <div className="w-full md:w-3/4 p-4 md:pl-8 flex flex-col justify-start items-start">
                    <h2 className="text-gray-800 font-semibold text-3xl">{accesorio.name}</h2>
                    <p className="text-gray-600 mt-2">Código: {accesorio.codigo || 'No disponible'}</p>
                    <p className="text-gray-600 mt-2"> stock :{accesorio.stock}</p>
                    <hr className="border-gray-300 my-2 w-full" />
                    <div className="flex items-center mt-2">
                        <p className="text-gray-900 font-bold text-xl mr-4">Precio: ${accesorio.precio}</p>
                        <button onClick={handleAddToCart} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300">Agregar al carrito</button>
                    </div>
                    <hr className="border-gray-300 my-2 w-full" />
                    <p className="text-gray-600 mt-2">{accesorio.descripcion}</p>

                </div>
            </div>
        </div>
    )
}

export default DetallesAccesorios;
