"use client";

import { log } from "../../common/log";
import { signInUser, registerUser, FirebaseAuthResponse } from "../../controller/auth/FirebaseGateway";
import "./style.css";
import { FormEvent, useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { getCookie, setCookie } from "../../common/cookie";
import { USER_ID } from "../../common/keys";
import { redirect } from "../../common/helper";

type ReactSetStateFunction<T = any> = (value: T | ((prevState: T) => T)) => void;

function parseFirebaseError(error: string | FirebaseError): string {
    if (typeof error === "string") {
        return error;
    }
    const splitError: string = error.code.split("/")[1].split("-").join(" ").trim();

    return splitError[0].toUpperCase() + splitError.slice(1);
    // TODO: Have a better error message for each type of error

}


async function loginUser(email: string, password: string, setErrorMessage: ReactSetStateFunction<string>): Promise<void> {
    const result: FirebaseAuthResponse = await signInUser(email, password);
    if (result.type === "success") {
        log("Signed in successfully");
        setErrorMessage("Signed in successfully.");

        setCookie(USER_ID, result.body.user.uid);

        // Programmatically redirect back to home screen
        redirect("/");


    } else {
        setErrorMessage("Error: " + parseFirebaseError(result.body as FirebaseError));
    }
}

async function register(email: string, password1: string, password2: string, setErrorMessage: ReactSetStateFunction<string>) {
    if (password1 !== password2) {
        setErrorMessage("Error: Passwords do not match.");
        return;
    }
    if (password1.length <= 6) {
        setErrorMessage("Error: Password must be longer than 6 characters.");
        return;
    }

    const result: FirebaseAuthResponse = await registerUser(email, password1);
    if (result.type === "success") {
        log("Registered successfully");
        // Redirect to home or profile maybe
        redirect("/")
    } else {
        setErrorMessage("Error: " + parseFirebaseError(result.body as FirebaseError));

    }
}

const onFieldChange = (setState: ReactSetStateFunction, property: string = "value") =>
    (inputEvent: FormEvent) =>
        setState((inputEvent.target as any)[property])


export default function AuthPage() {
    const [returningUser, setReturningUser] = useState(true);

    useEffect(() => {
        getCookie(USER_ID).then((response: string | undefined) => {
            console.log(response)
            if (response !== undefined) { // userid already stored, redirect to profile page
                redirect("/profile");
            }
        })
    }, []);


    return <div className="contentContainer">
        <label htmlFor="returningCheckbox">Returning</label>
        <input id="returningCheckbox"
            type="checkbox"
            checked={returningUser}
            onChange={onFieldChange(setReturningUser, "checked")} />

        {returningUser ? <LoginUI /> : <RegisterUI />}

    </div>
}


const LoginUI = () => {
    const [errorMessage, setErrorMessage] = useState('');


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisibility] = useState(false);


    return <div className="inputFields">
        <label htmlFor="emailInput">Email:</label>
        <input id="emailInput"
            type="email"
            onChange={onFieldChange(setEmail)}
        />

        <label htmlFor="passwordInput">Password:</label>
        <div style={{ display: "flex" }}>
            <input id="passwordInput"
                style={{ width: "100%" }}
                type={passwordVisible ? "text" : "password"}
                onChange={onFieldChange(setPassword)} />

            <input type="checkbox" onChange={onFieldChange(setPasswordVisibility, "checked")} />
        </div>

        <p>{errorMessage}</p>

        <p className="submit" onClick={() => loginUser(email, password, setErrorMessage)}>Submit</p>

    </div>
}

const RegisterUI = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const [password1Visible, setPassword1Visibility] = useState(false);
    const [password2Visible, setPassword2Visibility] = useState(false);

    return <div className="inputFields">
        <label htmlFor="emailInput">Email:</label>
        <input id="emailInput" type="email" onChange={onFieldChange(setEmail)} />

        <label htmlFor="password1Input">Password (min. 6 characters):</label>

        <div style={{ display: "flex" }}>
            <input id="password1Input"
                style={{ width: "100%" }}
                type={password1Visible ? "text" : "password"}
                onChange={onFieldChange(setPassword1)} />

            <input type="checkbox" onChange={onFieldChange(setPassword1Visibility, "checked")} />

        </div>


        <label htmlFor="password2Input">Repeat Password:</label>

        <div style={{ display: "flex" }}>
            <input id="password2Input"
                style={{ width: "100%" }}
                type={password2Visible ? "text" : "password"}
                onChange={onFieldChange(setPassword2)} />

            <input type="checkbox" onChange={onFieldChange(setPassword2Visibility, "checked")} />
        </div>


        <p>{errorMessage}</p>

        <p className="submit" onClick={() => register(email, password1, password2, setErrorMessage)}>Submit</p>

    </div>
}