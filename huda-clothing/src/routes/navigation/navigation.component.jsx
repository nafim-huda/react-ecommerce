import { Fragment } from "react";
import { Outlet, Link} from "react-router-dom";

import { ReactComponent as HudaLogo } from '../../assets/crown.svg'

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
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'> 
                    <HudaLogo className='logo' />
                </Link>
                <div children='nav-links-container'>
                    <Link className="nav-link" to='/shop'>
                        SHOP 
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;