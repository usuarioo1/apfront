'use client'
import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
    cartItems: [],
}

const getStockLimit = (item) => {
    const stock = Number(item?.stock);
    return Number.isFinite(stock) && stock >= 0 ? stock : null;
};

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItemIndex = state.cartItems.findIndex(item => item._id === action.item._id);

            const stockLimit = getStockLimit(action.item);
            if (stockLimit !== null && stockLimit <= 0) {
                // No permitir agregar productos sin stock
                return state;
            }

            if (existingItemIndex !== -1) {
                // Si el producto ya existe en el carrito, aumenta la cantidad hasta el stock máximo
                const updatedCartItems = [...state.cartItems];
                const existingItem = updatedCartItems[existingItemIndex];
                const existingStockLimit = getStockLimit(existingItem);

                if (existingStockLimit !== null && existingItem.quantity >= existingStockLimit) {
                    return state;
                }

                updatedCartItems[existingItemIndex] = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1
                };
                return { ...state, cartItems: updatedCartItems };
            } else {
                // Si es un nuevo producto, agrégalo al carrito
                return { ...state, cartItems: [...state.cartItems, { ...action.item, quantity: 1 }] };
            }

        case 'REMOVE_ITEM':
            const existingItem = state.cartItems.find(item => item._id === action.id);
            if (existingItem.quantity > 1) {
                // Si la cantidad del producto es mayor que 1, reducimos la cantidad en 1
                const updatedCartItems = state.cartItems.map(item =>
                    item._id === action.id ? { ...item, quantity: item.quantity - 1 } : item
                );
                return { ...state, cartItems: updatedCartItems };
            } else {
                // Si la cantidad del producto es 1, lo eliminamos del carrito
                const newCartItems = state.cartItems.filter(item => item._id !== action.id);
                return { ...state, cartItems: newCartItems };
            }
        default:
            return state;
    }
}

export function CartContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addItem = (item) => {
        const stockLimit = getStockLimit(item);
        if (stockLimit !== null && stockLimit <= 0) {
            return false;
        }

        const existingItem = state.cartItems.find(cartItem => cartItem._id === item._id);
        if (existingItem) {
            const existingStockLimit = getStockLimit(existingItem);
            if (existingStockLimit !== null && existingItem.quantity >= existingStockLimit) {
                return false;
            }
        }

        dispatch({ type: 'ADD_ITEM', item });
        
        // Disparar evento AddToCart de Facebook Pixel (opcional)
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'AddToCart', {
                value: item.precio,
                currency: 'CLP',
                content_ids: [item._id],
                content_name: item.name,
                content_type: 'product',
                contents: [{
                    id: item._id,
                    quantity: 1,
                    item_price: item.precio
                }]
            });
        }

        return true;
    };

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', id });
    };

    return (
        <CartContext.Provider value={{ cartItems: state.cartItems, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};