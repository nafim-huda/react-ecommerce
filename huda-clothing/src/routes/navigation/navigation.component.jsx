import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as HudaLogo } from '../../assets/crown.svg'
import { UserContext } from "../../contexts/user.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss'

/* Fragment component does not actually render any HTML 
    - useful if you don't want a wrapping parent level component(i.e. top level div) 
        -> due to React rules we either need a parent level component or use Fragments to 
        avoid React giving us a problem

    Link from react-router-dom
        - lets us leverage routing from BrowerRoute to navigate to a store route
        - behaves like an <a> tag
    */

const Navigation = () => {
    /* useContext says re-render the functional component whenever a valaue
    (currentUser) updates go ahead and re-render Navigation component
    - another way to think about it -> Navigation component is listening for
    any updates to the currentUser 
    ex.)
    setCurrentUser is performed upon sign-in ->
     currentUser value is updated in UserContext with useState() causing it to re-render-> 
    Navigation will re-render since it was listening for changes to useContext on the UserContext component
    */
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    }
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <HudaLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {currentUser ? (
                        <span className="nav-link" onClick={signOutHandler}> SIGN OUT</span>
                    ) : (
                        <Link className="nav-link" to='/auth'>
                            SIGN IN
                        </Link>
                    )}
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;