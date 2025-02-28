"use server";


import { log } from "../../common/log";
import { getAuth, createUserWithEmailAndPassword, Auth, UserCredential, signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { FirebaseError, FirebaseOptions, initializeApp } from 'firebase/app';
import { respondError, respondSuccess, ResponseResult } from "../../common/Response";

// I think this is fine to leave here...
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyB1_lsrSS76rNrxnbLe0BGE4MdUWZj1P1Q",
    authDomain: "resume-tailor-72561.firebaseapp.com",
    projectId: "resume-tailor-72561",
    storageBucket: "resume-tailor-72561.firebasestorage.app",
    messagingSenderId: "1055032426682",
    appId: "1:1055032426682:web:fa0fbf3eb2e2bb11b28283",
    measurementId: "G-H2CV0CTK51"
};



let auth: Auth | undefined = undefined;
export async function initFirebase() {
    if (auth !== undefined) {
        log("Attempted to re-initialize auth.");
    }
    const app = initializeApp(firebaseConfig);

    auth = getAuth(app);
}


function parseFirebaseError(error: string | FirebaseError): string {
    if (typeof error === "string") {
        return error;
    }
    const splitError: string = error.code.split("/")[1].split("-").join(" ").trim();

    return splitError[0].toUpperCase() + splitError.slice(1);
    // TODO: Have a better error message for each type of error

}

export async function registerUserInFirebase(email: string, password: string): Promise<ResponseResult<UserCredential, string>> {
    if (auth === undefined) {
        initFirebase();
    }

    if (auth === undefined) {
        return Promise.resolve({
            type: "failure",
            body: "Could not initialize Firebase",
        });

    }
    return createUserWithEmailAndPassword(auth, email, password).then((user) => {
        return respondSuccess(user)
    }).catch((err: AuthError) => {
        return respondError(parseFirebaseError(err)) 
    });
}

export async function signInUserInFirebase(email: string, password: string): Promise<ResponseResult<UserCredential, string>> {
    if (auth === undefined) {
        initFirebase();
    }

    if (auth === undefined) {
        return Promise.resolve(respondError("Could not initialize Firebase."));
    }
    return signInWithEmailAndPassword(auth, email, password).then((user) => {
        return respondSuccess(user)
    }).catch((err: AuthError) => {
        return respondError(parseFirebaseError(err)) 
    });

}