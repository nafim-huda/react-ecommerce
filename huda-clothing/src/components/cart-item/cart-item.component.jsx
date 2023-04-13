import { memo } from 'react';

import './cart-item.styles.scss'

/* memo() lets us cache our functional component -> in our application 
    we may need to add memo() to our CheckoutItem for our Checkout route -> be careful
    about placing memo() since there is an optimization cost upon the component initially being
    mounted 
*/

const CartItem = memo(({cartItem}) => {
    const { name, imageUrl, quantity, price} = cartItem;  
    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='item-details'></div>
                <span className='name'>{name}</span>
                <span className='price'>
                    {quantity} * ${price}
                </span>
        </div>
    )
});

export default CartItem;