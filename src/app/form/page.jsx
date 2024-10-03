'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';  // Importar useRouter para redirigir
import { CartContext } from '@/contexts/CartContext';
import Pago from '@/components/Pago';

export default function Component() {
    const { cartItems } = useContext(CartContext); // Obtener los productos del carrito
    const router = useRouter(); // Definir useRouter para redireccionar después del submit
    const regiones = [
        "Arica y Parinacota",
        "Tarapacá",
        "Antofagasta",
        "Atacama",
        "Coquimbo",
        "Valparaíso",
        "Metropolitana de Santiago",
        "Libertador General Bernardo O'Higgins",
        "Maule",
        "Ñuble",
        "Biobío",
        "La Araucanía",
        "Los Ríos",
        "Los Lagos",
        "Aysén del General Carlos Ibáñez del Campo",
        "Magallanes y de la Antártica Chilena"
    ];

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        rut: '',
        region: '',
        direccion: '',
        referencia: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Datos a enviar al backend
        const dataToSend = {
            ...formData, // Información del formulario
            cartItems,   // Productos seleccionados del carrito
            total: calcularTotal() // Total de la compra
        };
    
        try {
            const response = await fetch('http://localhost:4000/save_order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            const result = await response.json();
            console.log('Resultado del backend:', result);
            
            // Si el envío es exitoso, redirigir a la página de checkout
            if (response.ok) {
                router.push('/checkout'); // Redirigir después de guardar la orden
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };
    
    const calcularTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container mx-auto mt-10 p-6">
            <div className="flex flex-col lg:flex-row">
                {/* Formulario de contacto */}
                <div className="lg:w-2/3 p-6 bg-white rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Formulario de Contacto</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Campos del formulario */}
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="rut" className="block text-sm font-medium text-gray-700">RUT</label>
                            <input
                                type="text"
                                id="rut"
                                name="rut"
                                value={formData.rut}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">Región</label>
                            <select
                                id="region"
                                name="region"
                                value={formData.region}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Seleccione una región</option>
                                {regiones.map((region, index) => (
                                    <option key={index} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección</label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="referencia" className="block text-sm font-medium text-gray-700">Referencia</label>
                            <textarea
                                id="referencia"
                                name="referencia"
                                value={formData.referencia}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Finalizar Compra
                            </button>
                        </div>
                    </form>
                </div>

                {/* Resumen de compra */}
                <div className="lg:w-1/3 p-6 bg-gray-100 rounded-lg shadow-xl lg:ml-6 mt-6 lg:mt-0">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Resumen de la Compra</h2>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-600">Tu carrito está vacío</p>
                    ) : (
                        <div>
                            {cartItems.map((item) => (
                                <div key={item._id} className="mb-4">
                                    <p className="text-gray-700 font-medium">{item.name} x {item.quantity}</p>
                                    <p className="text-gray-600">Precio: ${item.precio.toFixed(2)}</p>
                                </div>
                            ))}
                            <hr className="my-4" />
                            <p className="text-lg font-semibold text-gray-800">Total: ${calcularTotal()}</p>
                        </div>
                    )}
                </div>
            </div>
            {/* Componente Pago, fuera del formulario */}
            <div className="mt-6">
                <Pago total={calcularTotal()} />
            </div>
        </div>
    );
}
