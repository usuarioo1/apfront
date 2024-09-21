'use client';
import { useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';
import Link from 'next/link';

const Carrito = () => {
    const { cartItems, addItem, removeItem } = useContext(CartContext);

    const calcularTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6 text-center">Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">
                    Tu carrito está vacío.{' '}
                    <Link href="/productos">
                        ¡Compra algo!
                    </Link>
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4 text-gray-600 font-medium">Producto</th>
                                <th className="p-4 text-gray-600 font-medium">Precio</th>
                                <th className="p-4 text-gray-600 font-medium">Cantidad</th>
                                <th className="p-4 text-gray-600 font-medium">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item._id} className="border-t">
                                    <td className="p-4 text-gray-700">{item.name}</td>
                                    <td className="p-4 text-gray-700">${item.precio.toFixed(2)}</td>
                                    <td className="p-4 text-gray-700">
                                        <div className="flex items-center justify-center">
                                            <button
                                                className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500"
                                                onClick={() => removeItem(item._id)}
                                            >
                                                -
                                            </button>
                                            <span className="px-3 text-gray-900">{item.quantity}</span>
                                            <button
                                                className="px-3 py-1 bg-green-400 text-white rounded hover:bg-green-500"
                                                onClick={() => addItem(item)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-700">${(item.precio * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">Total: ${calcularTotal()}</h2>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Finalizar Compra
                </button>
            </div>
        </div>
    );
};

export default Carrito;
