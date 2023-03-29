import './button.styles.scss'

/* 
    three types of buttons: default, inverted, googleSignIn
*/

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}
// through the buttonType prop -> we can control how we want to render 
// the Button component based on the class name
const Button = ({ children, buttonType, ...otherProps }) => {
    return (
        <button 
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps}    
        >
            {children}
        </button>
    )
}

export default Button;