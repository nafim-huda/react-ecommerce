import { createContext, useState, useEffect } from "react"

/* define helper functions at the top */
const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
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

const removeCartItem = (cartItems, productToRemove) => {
    // find the cart item to remove 
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );
    // if quantity is equal to 1, remove it from cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id)
    }
    // return cartItems with matching cart item with updated quantity
    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearCartItem = (cartItems, productToClear) =>  cartItems.filter(cartItem => cartItem.id !== productToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    /* Compute new cart count*/
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) =>
            total + cartItem.quantity, 0);
        setCartCount(newCartCount)
    }, [cartItems])
    /* Compute new cart total*/
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) =>
            total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        // need to determine if we need to add a new cartItem or update the existing
        // quantity for the already stored cartItem
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear))
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
    }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}