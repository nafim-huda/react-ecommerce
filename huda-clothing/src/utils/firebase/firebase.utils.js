/* 
initializeApp - creates an instance of FirebaseApp based on configuration params
*/
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc, // retrieves document instance
    getDoc, // gets a document's data
    setDoc, // sets a document's data
} from 'firebase/firestore'

// Your web app's Firebase configuration
// Firebase needs its apiKey to be exposed -> goes against best practice 

const firebaseConfig = {
    apiKey: "AIzaSyC8jSbSCKogodAz_lXzHVE6olGMCEsFBEk",
    authDomain: "huda-clothing-db.firebaseapp.com",
    projectId: "huda-clothing-db",
    storageBucket: "huda-clothing-db.appspot.com",
    messagingSenderId: "207930860780",
    appId: "1:207930860780:web:b526a11ecd184e757431c9"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();
/* Based on configuration parameters -> we can tell our GoogleAuthProvider how to behave*/
provider.setCustomParameters({
    prompt: "select_account"
})
/* Singleton instance of getAuth because the rules for authentication for the 
application only follow one approach while we can have multiple providers depending on 
the use case
*/
export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

// Initialize FireStore DB that points to our DB inside of our Firebase Console
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    // check if there is an existing document reference
    /* Note that Google will generate a userAuth object even though a document does NOT exist
    inside of Firestore -> below doc() will create a new firestore 
    */
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef); 
    console.log(userSnapshot)
    // .exists() tells us whether our FireStore DB actually contains the document reference and data
    // associated with the reference 
    if(!userSnapshot.exists()) {
        // create new instance of user document+data
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    
    return userDocRef
}

