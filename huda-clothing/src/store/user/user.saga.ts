/*
    typed-redux-saga/macro:
        - babel macro plugin that simplifies output from our sage fucntions from
        the typed-redux-macro library 
*/

import { takeLatest, put, all, call } from 'typed-redux-saga/macro'

import { USER_ACTION_TYPES } from './user.types'

import { 
    signInSuccess, 
    signInFailed,
    signOutSuccess,
    signOutFailed,
    signUpSuccess,
    signUpFailed,
    EmailSignInStart,
    SignUpSuccess,
    SignUpStart
 } from './user.action'

import { 
    getCurrentUser,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopUp,
    signOutUser,
    createAuthUserWithEmailAndPassword,
    AdditionalInformation,
} from '../../utils/firebase/firebase.utils'
import { User } from 'firebase/auth';

/* B(Business)-Logic Sagas */

export function* getSnapShotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(
            createUserDocumentFromAuth, 
            userAuth, 
            additionalDetails
        );
        if(userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })) ;       
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}


export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if(!userAuth) return;
        // if userAuth exists and not null -> yield* call
        yield* call(getSnapShotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopUp);
        yield* call(getSnapShotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
    try {
        const userCredential = yield* call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        if(userCredential) {
            const user  = userCredential.user
            yield* call(getSnapShotFromUserAuth, user)
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signUp({payload: { email, password, displayName }}: SignUpStart) {
    try {
        const userCredential = yield* call(
            createAuthUserWithEmailAndPassword, 
            email, 
            password
        );
        // call a second entry point saga -> onSignUpSuccess()
        if(userCredential) {
            const user = userCredential.user
            yield* put(signUpSuccess(user, { displayName }));
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
}

export function* signInAfterSignUp({payload: { user, additionalDetails }}: SignUpSuccess) {
    yield* call(getSnapShotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error))
    }
}

/* Entry Point Sagas */

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}


export function* onCheckUserSession() {
    // takeLatest() is listening for an action types matching its first arg, second arg will call saga generator function
    yield* takeLatest(
        USER_ACTION_TYPES.CHECK_USER_SESSION, 
        isUserAuthenticated
    );
};

/* Collection Saga */
export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}