'use client';
import { useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';
import Link from 'next/link';
import FranjaInformativa from '@/components/WholeSale';

const Carrito = () => {
    const { cartItems, addItem, removeItem } = useContext(CartContext);

    // Cyber Monday: 10% de descuento + descuento por mayor si aplica
    const CYBER_DESCUENTO = 0.10;
    const obtenerCarritoConDescuentos = () => {
        // Primero aplicamos Cyber Monday (-10%)
        const itemsConCyber = cartItems.map((item) => ({
            ...item,
            precioCyber: Math.round(item.precio * (1 - CYBER_DESCUENTO)),
        }));
        
        // Calculamos total con descuento Cyber
        const totalConCyber = itemsConCyber.reduce((acc, item) => acc + item.precioCyber * item.quantity, 0);
        
        // Si el total es > 100,000, aplicamos descuento por mayor (dividir por 1.5)
        const aplicarMayor = totalConCyber > 100000;
        const itemsFinales = itemsConCyber.map((item) => ({
            ...item,
            precioFinal: aplicarMayor ? Math.round(item.precioCyber / 1.5) : item.precioCyber,
        }));
        
        const totalFinal = itemsFinales.reduce((acc, item) => acc + item.precioFinal * item.quantity, 0);
        
        return { items: itemsFinales, total: totalFinal, esCyber: true, esMayor: aplicarMayor };
    };

    const { items: cartItemsConDescuento, total, esCyber, esMayor } = obtenerCarritoConDescuentos();

    return (
        <div>
            <FranjaInformativa />
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
                                <th className="p-4 text-gray-600 font-medium">Imagen</th>
                                <th className="p-4 text-gray-600 font-medium">Precio</th>
                                <th className="p-4 text-gray-600 font-medium">Cantidad</th>
                                <th className="p-4 text-gray-600 font-medium">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItemsConDescuento.map((item) => (
                                <tr key={item._id} className="border-t">
                                    <td className="p-4 text-gray-700">{item.name}</td>
                                    <td className="p-4">
                                        <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        ${item.precioFinal} 
                                        <span className="text-xs text-pink-600 font-semibold block">Cyber Monday -10%</span>
                                        {esMayor && <span className="text-xs text-green-600 font-semibold block">Por mayor adicional</span>}
                                    </td>
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
                                    <td className="p-4 text-gray-700">
                                        ${item.precioFinal * item.quantity} 
                                        <span className="text-xs text-pink-600 font-semibold block">Con descuentos</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Total: ${total} 
                    <span className="text-sm text-pink-600 font-semibold block">Cyber Monday -10%</span>
                    {esMayor && <span className="text-sm text-green-600 font-semibold block">+ Descuento por mayor</span>}
                </h2>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    <Link href={'/form'}>Continuar con la Compra</Link>
                </button>
            </div>
        </div>
        </div>
    );
};

export default Carrito;
