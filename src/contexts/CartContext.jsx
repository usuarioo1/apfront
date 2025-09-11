// Ejemplo de cómo agregar eventos en tu CartContext
'use client';

import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Función para agregar productos al carrito
    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item._id === product._id);
        
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }

        // Disparar evento AddToCart de Facebook Pixel
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'AddToCart', {
                value: product.precio,
                currency: 'CLP',
                content_ids: [product._id],
                content_name: product.name,
                content_type: 'product',
                contents: [{
                    id: product._id,
                    quantity: 1,
                    item_price: product.precio
                }]
            });
        }
    };

    // Función para ver contenido (cuando se ve un producto)
    const viewContent = (product) => {
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'ViewContent', {
                value: product.precio,
                currency: 'CLP',
                content_ids: [product._id],
                content_name: product.name,
                content_type: 'product'
            });
        }
    };

    // Función para buscar productos
    const search = (searchTerm) => {
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'Search', {
                search_string: searchTerm
            });
        }
    };

    // Función para completar compra (llamar después de pago exitoso)
    const completePurchase = (orderData) => {
        if (typeof window !== 'undefined' && window.fbq && cartItems.length > 0) {
            const total = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
            const contents = cartItems.map(item => ({
                id: item._id,
                quantity: item.quantity,
                item_price: item.precio
            }));

            window.fbq('track', 'Purchase', {
                value: total,
                currency: 'CLP',
                contents: contents,
                num_items: cartItems.reduce((acc, item) => acc + item.quantity, 0)
            });
        }
    };

    // Otras funciones del carrito...
    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(productId);
        } else {
            setCartItems(cartItems.map(item =>
                item._id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            viewContent,
            search,
            completePurchase
        }}>
            {children}
        </CartContext.Provider>
    );
};