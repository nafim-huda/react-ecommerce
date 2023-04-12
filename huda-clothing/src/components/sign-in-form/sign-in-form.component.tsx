import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { 
    googleSignInStart,
    emailSignInStart
} from "../../store/user/user.action";

import {SignInContainer, ButtonsContainer} from './sign-in-form.styles'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields, [name]: value // [key] matches the key to the name of the key stored in our state obj
        })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
            // once we retrieve auth user from firebase -> set it inside of our context
            // setCurrentUser(user)
            // reset form
            resetFormFields();
        } catch (error) {
            console.log('user sign in failed', error)
        }
    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <h1>Sign in with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button
                    // prevent default type='submit' behavior for button components
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        type='button'
                        onClick={signInWithGoogle}
                        >
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;