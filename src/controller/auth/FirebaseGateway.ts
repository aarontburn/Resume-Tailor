import { log } from "../../common/log";
import { getAuth, createUserWithEmailAndPassword, Auth, UserCredential, signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { FirebaseError, FirebaseOptions, initializeApp } from 'firebase/app';

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

export type FirebaseAuthResponse = 
    { type: "success", body: UserCredential } |
    { type: "failure", body: FirebaseError | string }



let auth: Auth | undefined = undefined;
export function init() {
    if (auth !== undefined) {
        log("Attempted to re-initialize auth.");
    }
    const app = initializeApp(firebaseConfig);

    auth = getAuth(app);
}


export async function registerUser(email: string, password: string): Promise<FirebaseAuthResponse> {
    if (auth === undefined) {
        init();
    }

    if (auth === undefined) {
        return Promise.resolve({
            type: "failure",
            body: "Could not initialize Firebase",
        });

    }
    return createUserWithEmailAndPassword(auth, email, password).then((user) => {
        return { type: "success", body: user } as FirebaseAuthResponse
    }).catch((err: AuthError) => {
        return { type: "failure", body: err } as FirebaseAuthResponse
    });
}

export async function signInUser(email: string, password: string): Promise<FirebaseAuthResponse> {
    if (auth === undefined) {
        init();
    }

    if (auth === undefined) {
        return Promise.resolve({
            type: "failure",
            body: "Could not initialize Firebase",
        });

    }
    return signInWithEmailAndPassword(auth, email, password).then((user) => {
        return { type: "success", body: user } as FirebaseAuthResponse
    }).catch((err: Error) => {
        return { type: "failure", body: err } as FirebaseAuthResponse
    });

}