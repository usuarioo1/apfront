'use client'
import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
    cartItems: [],
}

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItemIndex = state.cartItems.findIndex(item => item._id === action.item._id);

            if (existingItemIndex !== -1) {
                // Si el producto ya existe en el carrito, aumenta la cantidad
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex] = {
                    ...updatedCartItems[existingItemIndex],
                    quantity: updatedCartItems[existingItemIndex].quantity + 1
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
        dispatch({ type: 'ADD_ITEM', item });
    };


    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', id });
    };

    return (
        <CartContext.Provider value={{ cartItems: state.cartItems, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    );
}