/* 
initializeApp - creates an instance of FirebaseApp based on configuration params
*/
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged, // returns a listener
    User,
    NextOrObserver
} from 'firebase/auth';
import {
    getFirestore,
    doc, // retrieves document instance
    getDoc, // gets a document's data
    setDoc, // sets a document's data
    collection, // retrieves a collection reference
    writeBatch, // instantiates a batch instance
    query,
    getDocs, 
    QueryDocumentSnapshot
} from 'firebase/firestore'

import { Category } from '../../store/categories/category.types';

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



const googleProvider = new GoogleAuthProvider();
/* Based on configuration parameters -> we can tell our GoogleAuthProvider how to behave*/
googleProvider.setCustomParameters({
    prompt: "select_account"
})
/* Singleton instance of getAuth because the rules for authentication for the 
application only follow one approach while we can have multiple providers depending on 
the use case
- auth keeps track of whether or not users are authenticating or not for the entire application
    regardless of your application mounting and unmounting
*/
export const auth = getAuth();

export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Initialize FireStore DB that points to our DB inside of our Firebase Console
export const db = getFirestore();

// This type represents the documents we want to add to the collection matching
// the collectionKey
export type ObjectToAdd = {
    title: string;
}

// async methods in TS require a Promise return type
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[],
): Promise<void> => {
    // first retrieve collection reference from db
    const collectionRef = collection(db, collectionKey)
    // create a transaction for adding all of the objects we are trying to add to the collection
    // first we need a batch instance
    const batch = writeBatch(db)
    objectsToAdd.forEach((object) => {
        // retrieve document reference for data
        const docRef = doc(collectionRef, object.title.toLowerCase())
        // add this batch to our set of batch commits
        batch.set(docRef, object)
    })
    // initiate transaction
    await batch.commit();
    console.log('Done')
}



export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    // instantiates an object for fetching document snapshots
    const q = query(collectionRef);
    // handling error example directly below(COMMENTED OUT)
    // await Promise.reject(new Error('new error whoops'))
    const querySnapshot = await getDocs(q);
    // retrieves the category data and reduce over all of the documents 
    // cast the data as 'Category' --> typically need to cast when pulling data from a 
    // third party API call
    return querySnapshot.docs.map(
        (docSnapshot) => docSnapshot.data() as Category
    );
}

export type AdditionalInformation = {
    displayName?: string;
}

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}

// this method's return type can be either a userSnapshot or null depending on the
// user event our listener catches (signing in, creating an account, signing out)
export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation = {} as AdditionalInformation
    ): Promise<void | QueryDocumentSnapshot<UserData>> => {
    // check if there is an existing document reference
    /* Note that Google will generate a userAuth object even though a document does NOT exist
    inside of Firestore -> below doc() will create a new firestore 
    */
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    // .exists() tells us whether our FireStore DB actually contains the document reference and data
    // associated with the reference 
    if (!userSnapshot.exists()) {
        // create new instance of user document+data
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation // if we do not provide displayName -> it will be inside of this additionalInformation obj
            })
        } catch (error) {
            // error is unknown type -> no properties/type associated so just pass in the error and NOT error.data
            console.log('error creating the user', error);
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    // protects our code 
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    // protects our code 
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

/* Note that Firebase will persist our user's authentication between 
refreshes because it keeps track of authentication while the connection is alive
*/

export const onAuthStateChangedListener = async (callback: NextOrObserver<User>) =>
    onAuthStateChanged(auth, callback); // errorCallback, completedCallback

/* Behind the scenes of our onAuthStateChanged(), we are creating a listener obj
    {
        next: callback
        error: errorCallback,
        complete: completedCallback
    }
*/
// convert our observable listener into a Promise 
export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth, 
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};