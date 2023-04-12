import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/category.types";

import {
    createAction,
    ActionWithPayload,
    withMatcher
} from "../../utils/reducer/reducer.utils";

/* define helper functions at the top */
const addCartItem = (
    cartItems: CartItem[], 
    productToAdd: CategoryItem
    ): CartItem[] => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => 
        cartItem.id === productToAdd.id
    );
    // if found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    // return new array with modified cartItems/new cartItem
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (
    cartItems: CartItem[],
     cartItemToRemove: CartItem
     ): CartItem[] => {
    // find the cart item to remove 
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    // If there is an exiting cart item -> then check if its quantity is equal to 1 
    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id)
    }
    // return cartItems with matching cart item with updated quantity
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearCartItem = (
    cartItems: CartItem[], 
    cartItemToClear: CartItem
    ): CartItem[] => 
        cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);




export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

// receive cartItems and output an action for SET_CART_ITEMs
export const setCartItems = withMatcher((
    cartItems: CartItem[]
    ): SetCartItems =>
        createAction(
            CART_ACTION_TYPES.SET_CART_ITEMS,
            cartItems
    )
);

export const setIsCartOpen = withMatcher((
    boolean: boolean
): SetIsCartOpen =>
    createAction(
        CART_ACTION_TYPES.SET_IS_CART_OPEN,
        boolean
    )
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
}

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
}

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItems);
}