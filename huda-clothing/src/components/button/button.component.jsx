import {
    BaseButton, 
    GoogleSignInButton, 
    InvertedButton
} from './button.styles';

/* 
    three types of buttons: default, inverted, googleSignIn
*/

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
}

// function that will render a styled component based on the buttonType key passed in as a prop
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => 
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

// through the buttonType prop -> we can control how we want to render 
// the Button component based on the class name
const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;