import './checkout-item.styles.scss'

import { useDispatch } from 'react-redux'

import { selectCartItems } from '../../store/cart/cart.selector'

import { 
    addItemToCart, 
    removeItemFromCart, 
    clearItemFromCart 
} from '../../store/cart/cart.slice'

const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch()
    
    const{ name, imageUrl, price, quantity } = cartItem

    /* Why use handler methods rather than place them directly into onClick()
        1.) Code clarity/readibility
        2.) Performance optimization

    */
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItem))
    const addItemHandler = () => dispatch(addItemToCart(cartItem))
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItem))

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItem