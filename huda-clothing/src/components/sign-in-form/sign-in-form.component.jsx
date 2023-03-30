import { useState } from "react";

import {
    signInWithGooglePopUp,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// UserContext will return the value object => value = { currentUser, setUser }

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        await signInWithGooglePopUp();
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields, [name]: value // [key] matches the key to the name of the key stored in our state obj
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email,password)
            // once we retrieve auth user from firebase -> set it inside of our context
            // setCurrentUser(user)
            // reset form
            resetFormFields();

        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;    
                default:
                    console.log(error)
            }
        }
    }

    return (
        <div className="sign-up-container">
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
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button
                    // prevent default type='submit' behavior for button components
                        type='button'
                        buttonType='google'
                        onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;