import { createUserDocumentFromAuth, signInWithGooglePopUp } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
        <div>
            <div>Sign In Page</div>
            <button onClick={logGoogleUser}>Sign In With Google Popup</button>
         </div>
    )
}

export default SignIn;