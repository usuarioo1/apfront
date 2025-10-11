'use client';

import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '@/contexts/CartContext';
import Pago from '@/components/Pago';

const CheckoutPage = () => {
    const { cartItems } = useContext(CartContext);
    const [costoEnvio, setCostoEnvio] = useState(0);

    // Recuperar el costo de envío desde localStorage cuando el componente se monte
    useEffect(() => {
        const costo = localStorage.getItem('costoEnvio');
        if (costo) {
            setCostoEnvio(parseInt(costo, 10));
        }
    }, []);

    // Disparar evento InitiateCheckout cuando se carga la página de checkout
    useEffect(() => {
        if (cartItems.length > 0 && typeof window !== 'undefined' && window.fbq) {
            const total = calcularTotal();
            const contents = cartItems.map(item => ({
                id: item._id,
                quantity: item.quantity,
                item_price: item.precio
            }));

            window.fbq('track', 'InitiateCheckout', {
                value: parseFloat(total),
                currency: 'CLP',
                contents: contents,
                num_items: cartItems.reduce((acc, item) => acc + item.quantity, 0)
            });
        }
    }, [cartItems]);

    const calcularTotal = () => {
        const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
        
        // Si el total es > 100,000, aplicamos descuento por mayor (dividir por 1.5)
        const aplicarMayor = subtotal > 100000;
        const totalFinal = aplicarMayor ? subtotal / 1.5 : subtotal;
        const envio = totalFinal > 150000 ? 0 : costoEnvio;
        
        return (Math.round(totalFinal) + envio).toFixed(0);
    };

    const isMayorCompra = () => {
        const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
        return subtotal > 100000;
    };

    // Función para disparar evento cuando se intenta pagar
    const handlePaymentAttempt = (paymentMethod) => {
        if (typeof window !== 'undefined' && window.fbq) {
            const total = calcularTotal();
            const contents = cartItems.map(item => ({
                id: item._id,
                quantity: item.quantity,
                item_price: item.precio
            }));

            window.fbq('track', 'AddPaymentInfo', {
                value: parseFloat(total),
                currency: 'CLP',
                contents: contents,
                payment_method: paymentMethod
            });
        }
    };

    return (
        <div className="container mx-auto mt-10 p-6">
            <div className="flex flex-col lg:flex-row">
                {/* Columna izquierda: Pago */}
                <div className="lg:w-1/2 p-6 bg-white rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Completar Pago-Online</h2>
                    {/* Componente Pago, que activa Mercado Pago */}
                    <div onClick={() => handlePaymentAttempt('mercadopago')}>
                        <Pago total={calcularTotal()} />
                    </div>
                </div>

                {/* Columna derecha: Resumen de la compra */}
                <div className="lg:w-1/2 p-6 bg-gray-100 rounded-lg shadow-xl lg:ml-6 mt-6 lg:mt-0">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Resumen de Compra</h2>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-600">Tu carrito está vacío</p>
                    ) : (
                        <div>
                            {cartItems.map((item) => {
                                const precioFinal = isMayorCompra() ? item.precio / 1.5 : item.precio;
                                return (
                                    <div key={item._id} className="mb-4">
                                        <p className="text-gray-700 font-medium">{item.name} x {item.quantity}</p>
                                        <p className="text-gray-600">
                                            Precio: ${Math.round(precioFinal)} 
                                            {isMayorCompra() && <span className="text-xs text-green-600 font-semibold block">Precio por mayor</span>}
                                        </p>
                                    </div>
                                );
                            })}
                            <hr className="my-4" />
                            <p className="text-lg font-semibold text-gray-800">
                                Total: ${calcularTotal()} 
                                {isMayorCompra() && <span className="text-xs text-green-600 font-semibold block">Descuento por mayor aplicado</span>}
                            </p>
                            {/* Mostrar el costo de envío */}
                            <div className="mt-4">
                                <strong>
                                    {isMayorCompra() ? (
                                        <p className="text-sm text-green-600 font-medium">¡Envío gratis!</p>
                                    ) : (
                                        <p className="text-sm text-gray-600">Costo de Envío: ${costoEnvio}</p>
                                    )}
                                </strong>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Botón para abrir el modal */}
            <button 
                className="btn mt-6 text-white" 
                onClick={() => {
                    handlePaymentAttempt('bank_transfer');
                    document.getElementById('my_modal_1').showModal();
                }}
            >
                Pago Con transferencia
            </button>

            {/* Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">¡Hola! Para pagar con transferencia sigue las instrucciones</h3>
                    <p className="py-4">
                        Debes enviar una foto del comprobante de pago al correo:
                        <a href="mailto:artesaniaspachyml@gmail.com" className="text-blue-600"> artesaniaspachyml@gmail.com</a>
                        con el asunto &quot;Pago vía transferencia&quot;.
                    </p>

                    <p className="py-2 font-semibold">Los datos para transferir son:</p>
                    <ul className="list-disc pl-5">
                        <li>Nombre: Héctor González Jofré</li>
                        <li>Cuenta corriente: Banco Santander</li>
                        <li>Número de cuenta: 2197239-8</li>
                        <li>Monto de la compra</li>
                    </ul>
                    <p className="py-4">Presiona la tecla ESC o haz clic en el botón a continuación para cerrar</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn text-white">Cerrar</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default CheckoutPage;