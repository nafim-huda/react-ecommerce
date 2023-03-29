// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";


import 
    {
     createUserDocumentFromAuth,
     signInWithGooglePopUp,
    } from "../../utils/firebase/firebase.utils";

    import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    /* Sign In with Google Redirect
        - application will remount upon redirect return -> inside of useEffect() callback
        we will get back the result from our auth state
    */
    
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    
    return (
        <div>
            <div>Sign In Page</div>
            <button onClick={logGoogleUser}>Sign In With Google Popup</button>
            <SignUpForm />
         </div>
    )
}

export default SignIn;