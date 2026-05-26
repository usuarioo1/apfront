'use client';
import { useContext, useState } from 'react';
import { CartContext } from '@/contexts/CartContext';
import Link from 'next/link';
import FranjaInformativa from '@/components/WholeSale';
import { useRouter } from 'next/navigation';

const Carrito = () => {
    const { cartItems, addItem, removeItem } = useContext(CartContext);
    const [isNavigating, setIsNavigating] = useState(false);
    const router = useRouter();

    const handleContinuarCompra = () => {
        if (isNavigating || cartItems.length === 0) {
            return;
        }

        setIsNavigating(true);
        router.push('/form');
    };

    const getStock = (item) => {
        const stock = Number(item.stock);
        return Number.isFinite(stock) && stock >= 0 ? stock : null;
    };

    const getPrecioBase = (item) => {
        const precio = Number(item.precio);
        return Number.isFinite(precio) ? precio : 0;
    };

    const getPrecioMayor = (item) => {
        const precioMayor = Number(item.precio_por_mayor);
        if (Number.isFinite(precioMayor) && precioMayor > 0) {
            return precioMayor;
        }

        return getPrecioBase(item);
    };

    // Calcular el total del carrito
    const calcularSubtotal = () => cartItems.reduce((acc, item) => acc + getPrecioBase(item) * item.quantity, 0);

    // Obtener los datos del carrito con descuento si aplica
    const obtenerCarritoConDescuento = () => {
        const subtotal = calcularSubtotal();
        const aplicarDescuento = subtotal > 100000;

        // Si aplica descuento, calcular los precios individuales con descuento
        const itemsConDescuento = cartItems.map((item) => ({
            ...item,
            precioDescuento: aplicarDescuento ? getPrecioMayor(item) : getPrecioBase(item),
        }));

        // Calcular el nuevo total con los precios descontados
        const totalConDescuento = itemsConDescuento.reduce(
            (acc, item) => acc + item.precioDescuento * item.quantity,
            0
        );

        return { items: itemsConDescuento, total: Math.round(totalConDescuento), esMayor: aplicarDescuento };
    };

    const { items: cartItemsConDescuento, total, esMayor } = obtenerCarritoConDescuento();

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
                                {cartItemsConDescuento.map((item) => {
                                    const stock = getStock(item);
                                    const maximoAlcanzado = stock !== null && item.quantity >= stock;

                                    return (
                                    <tr key={item._id} className="border-t">
                                        <td className="p-4 text-gray-700">{item.name}</td>
                                        <td className="p-4">
                                            <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                        </td>
                                        <td className="p-4 text-gray-700">
                                            ${Math.round(item.precioDescuento)} {esMayor && <span className="text-sm text-gray-500">(precio por mayor)</span>}
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
                                                    className={`px-3 py-1 text-white rounded ${
                                                        maximoAlcanzado
                                                            ? 'bg-gray-300 cursor-not-allowed'
                                                            : 'bg-green-400 hover:bg-green-500'
                                                    }`}
                                                    onClick={() => addItem(item)}
                                                    disabled={maximoAlcanzado}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {stock !== null && (
                                                <p className={`text-xs text-center mt-1 ${maximoAlcanzado ? 'text-red-500' : 'text-gray-500'}`}>
                                                    {maximoAlcanzado ? `Stock máximo alcanzado (${stock})` : `Stock disponible: ${stock}`}
                                                </p>
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-700">${Math.round(item.precioDescuento * item.quantity)}</td>
                                    </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="mt-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Total: ${total} {esMayor && <span className="text-sm text-gray-500">(precio por mayor)</span>}
                    </h2>
                    <button
                        type="button"
                        onClick={handleContinuarCompra}
                        disabled={isNavigating || cartItems.length === 0}
                        className={`mt-4 px-6 py-2 text-white rounded inline-flex items-center justify-center gap-2 transition-colors ${
                            isNavigating || cartItems.length === 0
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isNavigating ? (
                            <>
                                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></span>
                                Cargando...
                            </>
                        ) : (
                            'Continuar con la Compra'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carrito;
