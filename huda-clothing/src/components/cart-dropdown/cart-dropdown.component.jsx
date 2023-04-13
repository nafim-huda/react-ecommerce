import { useCallback, useState, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'

const CartDropdown = () => {
    const cartItems  = useSelector(selectCartItems)
    const navigate = useNavigate(); 
    
    const goToCheckoutHandler = useCallback(() => {
        // If you anticipate anything inside of the function that this useCallback() is 
        // reliant upon -> include it in the dependency array(i.e. some temp var )
        navigate('/checkout')
    }, []);

    return (
        <CartDropdownContainer>
            <CartItems>
            {
                cartItems.length ? (cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )
            }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;

/* 
    useCallback() 
        - react will always return the same function(goToCheckoutHandler) if nothing
        in the dependency array changes 
    

 
    useMemo()
         - memoizes the value returned by a function -> typically used for computationally
         expensive functions which compute a value to be rendered
         ex.)
         const hundredCount = useMemo(() => {
            console.log('start')
            sleep(2000)
            console.log('end')
            return 100 + count;
         }, [count]);
         })
         const val = hundredCount();
*/
