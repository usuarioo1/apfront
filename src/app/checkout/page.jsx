'use client';

import React, { useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';
import Pago from '@/components/Pago';

const CheckoutPage = () => {
    const { cartItems } = useContext(CartContext); // Obtener los productos del carrito

    const calcularTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container mx-auto mt-10 p-6">
            <div className="flex flex-col lg:flex-row">
                {/* Columna izquierda: Pago */}
                <div className="lg:w-1/2 p-6 bg-white rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Completar Pago</h2>
                    {/* Componente Pago, que activa Mercado Pago */}
                    <Pago total={calcularTotal()} />
                </div>

                {/* Columna derecha: Resumen de la compra */}
                <div className="lg:w-1/2 p-6 bg-gray-100 rounded-lg shadow-xl lg:ml-6 mt-6 lg:mt-0">
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
        </div>
    );
};

export default CheckoutPage;
