'use client';
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';
import { getCadenasById } from '../cadenasApi';

const DetallesCadenas = ({params}) => {
    const {cadenaId} = params;
    const [cadena ,setCadena] = useState(null);
    const {addItem} = useContext(CartContext);

    useEffect(() => {
        const fetchCadenas = async () => {

            try {
                const data = await getCadenasById(cadenaId)
                if(data){
                    setCadena(data);
                }else{
                    console.log('cadena no encontrada')
                }
            } catch (error) {
                console.error('no se puso obtener la cadena por id', error)
            }
        };

        fetchCadenas();
    },[cadenaId]);

    if(!cadena){
        return <div><h2>Cadena no encontrada</h2></div>
    }


    const handleAddToCart = () =>{
        addItem(cadena);
        console.log('cadena añadida al carrito', cadena);
    };


    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-9/12 m-auto mt-24 mb-20">
            <div className="w-full md:flex">
                <img className="h-full w-full object-contain md:w-1/4 md:h-auto" src={cadena.img} alt={cadena.name} onContextMenu={(e)=> e.preventDefault()} />
                <div className="w-full md:w-3/4 p-4 md:pl-8 flex flex-col justify-start items-start">
                    <h2 className="text-gray-800 font-semibold text-3xl">{cadena.name}</h2>
                    <p className="text-gray-600 mt-2">Código: {cadena.codigo || 'No disponible'}</p>
                    <p className="text-gray-600 mt-2"> stock :{cadena.stock}</p>
                    <hr className="border-gray-300 my-2 w-full" />
                    <div className="flex items-center mt-2">
                        <p className="text-gray-900 font-bold text-xl mr-4">Precio: ${cadena.precio}</p>
                        <button onClick={handleAddToCart} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300">Agregar al carrito</button>
                    </div>  
                    <hr className="border-gray-300 my-2 w-full" />
                    <strong><p className="text-gray-900 font-bold text-xl mr-4">Por mayor: ${Math.round(cadena.precio/1.5)}</p></strong>
                    <hr className="border-gray-300 my-2 w-full" />
                    <p className="text-gray-600 mt-2">{cadena.descripcion}</p>
                    
                </div>
            </div>
        </div>
    );


}

export default DetallesCadenas;
