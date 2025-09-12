'use client';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from '@/contexts/CartContext';
import { apiSaveOrder } from '@/utils/api';
import FranjaInformativa from '@/components/WholeSale';

export default function Component() {
    const { cartItems } = useContext(CartContext);
    const router = useRouter();

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
        "Magallanes y de la Antártica Chilena",
        //"sin envio"
    ];

    const costosEnvio = {
        "Arica y Parinacota": 10500,
        "Tarapacá": 10000,
        "Antofagasta": 9500,
        "Atacama": 8500,
        "Coquimbo": 7500,
        "Valparaíso": 7000,
        "Metropolitana de Santiago": 5000,
        "Libertador General Bernardo O'Higgins": 6500,
        "Maule": 7000,
        "Ñuble": 8000,
        "Biobío": 8500,
        "La Araucanía": 9000,
        "Los Ríos": 9500,
        "Los Lagos": 10000,
        "Aysén del General Carlos Ibáñez del Campo": 12500,
        "Magallanes y de la Antártica Chilena": 16000
        // "sin envio": 0 revisar en el formulario.
    };

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        rut: '',
        region: '',
        comuna: '',
        direccion: '',
        referencia: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calcularTotal = () => {
        const totalProductos = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
        const descuento = totalProductos > 100000 ? 1.5 : 1;
        return totalProductos / descuento;
    };

    const isMayorCompra = () => {
        const total = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
        return total > 100000;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const total = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
        const costoEnvio = total > 150000 ? 0 : (costosEnvio[formData.region] || 0);

        // Mapear cartItems para incluir _id, name, quantity, precio (lo que pide backend)
        const cartItemsConId = cartItems.map(item => ({
            _id: item._id,   // muy importante para backend
            name: item.name,
            quantity: item.quantity,
            precio: item.precio
        }));

        const dataToSend = {
            ...formData,
            cartItems: cartItemsConId,
            total: calcularTotal(),
            costoEnvio,
        };

        try {
            const response = await fetch(apiSaveOrder, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();
            console.log('Resultado backend:', result);

            if (response.ok && result.order?._id) {
                // Guardar el orderId en localStorage para usarlo en el checkout
                localStorage.setItem('orderId', result.order._id);
                localStorage.setItem('costoEnvio', dataToSend.costoEnvio); // Por si lo necesitas en checkout
                router.push('/checkout');
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <FranjaInformativa />
            <div className="container mx-auto mt-10 p-6">
                <div className="flex flex-col lg:flex-row">
                    {/* Formulario */}
                    <div className="lg:w-2/3 p-6 bg-white rounded-lg shadow-xl">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Formulario de Contacto</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                    {regiones.map((region, idx) => (
                                        <option key={idx} value={region}>{region}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="comuna" className="block text-sm font-medium text-gray-700">Comuna</label>
                                <input type="text" 
                                id='comuna' 
                                name='comuna' 
                                value={formData.comuna} 
                                onChange={handleChange} 
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
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
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {isLoading ? 'Procesando...' : 'Finalizar Compra'}
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
                                {cartItems.map(item => {
                                    const precioFinal = isMayorCompra() ? item.precio / 1.5 : item.precio;
                                    return (
                                        <div key={item._id} className="mb-4 flex justify-between items-center">
                                            <div className="flex-1">
                                                <p className="text-gray-700 font-medium">{item.name} x {item.quantity}</p>
                                                <p className="text-gray-600 mt-1">
                                                    Precio: ${precioFinal.toFixed(0)} <span className="text-sm text-gray-500">(c/u)</span>
                                                </p>
                                            </div>
                                            <div className="ml-4">
                                                <img
                                                    src={item.img}
                                                    alt={item.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-gray-800 font-semibold">Costo de Envío:</p>
                                    <div className="text-right">
                                        {isMayorCompra() ? (
                                            <p className="text-green-600 font-medium">¡Envío gratis!</p>
                                        ) : (
                                            <p className="text-gray-800">${costosEnvio[formData.region] || 0}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-gray-800 font-semibold">Total:</p>
                                    <div className="text-right">
                                        <p className="text-gray-800">
                                            ${Math.round(calcularTotal()) + (isMayorCompra() ? 0 : (costosEnvio[formData.region] || 0))}
                                        </p>
                                        {isMayorCompra() && (
                                            <span className="text-sm text-green-600">Compra por mayor - Envío gratis</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
