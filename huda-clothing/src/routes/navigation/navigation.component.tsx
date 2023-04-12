import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as HudaLogo } from '../../assets/crown.svg'

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";


import { signOutStart } from "../../store/user/user.action";

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
    const dispatch = useDispatch()
    // selector function - extracts off values from entire redux store

    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen  = useSelector(selectIsCartOpen)

    const signOutUser = () => dispatch(signOutStart());

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