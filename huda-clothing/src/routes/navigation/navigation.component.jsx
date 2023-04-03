import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as HudaLogo } from '../../assets/crown.svg'
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
    NavigationContainer,
    LogoContainer,
    NavLinks,
    NavLink,
} from './navigation.styles.jsx'

/* Fragment component does not actually render any HTML 
    - useful if you don't want a wrapping parent level component(i.e. top level div) 
        -> due to React rules we either need a parent level component or use Fragments to 
        avoid React giving us a problem

    Link from react-router-dom
        - lets us leverage routing from BrowerRoute to navigate to a store route
        - behaves like an <a> tag
    */

const Navigation = () => {
    /* useContext says re-render the functional component whenever a value
    (currentUser) updates go ahead and re-render Navigation component
    - another way to think about it -> Navigation component is listening for
    any updates to the currentUser 
    ex.)
    setCurrentUser is performed upon sign-in ->
     currentUser value is updated in UserContext with useState() causing it to re-render-> 
    Navigation will re-render since it was listening for changes to useContext on the UserContext component
    */
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <HudaLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>

                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>
                             SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                { // if both isCartOpen and CartDropdown evaluate to true -> render CartDropdown
                    isCartOpen && <CartDropdown /> 
                }
             </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;