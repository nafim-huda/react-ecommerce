import { FC, ButtonHTMLAttributes } from 'react';

import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
    ButtonSpinner
} from './button.styles';

/* 
    three types of buttons: default, inverted, googleSignIn
*/

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted',
}

// function that will render a styled component based on the buttonType key passed in as a prop
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
}[buttonType]);

export type ButtonProps = {
    // first define props unique to custom Buttons(buttonType) in our project
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

// through the buttonType prop -> we can control how we want to render 
// the Button component based on the class name
// the FC type extends
const Button: FC<ButtonProps> = ({
    children, 
    buttonType, 
    isLoading, 
    ...otherProps 
}) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    )
};

export default Button;