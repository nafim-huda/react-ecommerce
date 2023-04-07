import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)

export const addItemToCart = (cartItems, cartItemToAdd) => {
    const newCartItems = addCartItem(cartItems, cartItemToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems,cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}