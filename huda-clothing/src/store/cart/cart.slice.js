import { createSlice } from '@reduxjs/toolkit'

/* define helper functions at the top */
const addCartItem = (cartItems, cartItemToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToAdd.id
    );
    // if found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    // return new array with modified cartItems/new cartItem
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove 
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    // if quantity is equal to 1, remove it from cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id)
    }
    // return cartItems with matching cart item with updated quantity
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);


export const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        setCartItems(state, action) {
            state.cartItems = action.payload
        },
        setIsCartOpen(state, action) {
            state.isCartOpen = action.payload
        },
        addItemToCart(state,action) {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart(state,action) {
            state.cartItems = removeCartItem(state.cartItems, action.payload)
        },
        clearItemFromCart(state,action) {
            state.cartItems = clearCartItem(state.cartItems, action.payload)
        }
    }
})

export const { 
    setCartItems, 
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer