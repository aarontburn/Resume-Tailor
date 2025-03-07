"use server";

import { UserCredential } from "firebase/auth";
import { respondError, respondSuccess, ResponseResult } from "../../common/Response";
import { RTUser } from "../../common/database/RTUser";
import { registerUserInFirebase, signInUserInFirebase } from "./FirebaseGateway";
import { verifyUserIsInMongoDB } from "./MongoAuthGateway";


export async function registerUser(email: string, password: string): Promise<ResponseResult<RTUser, string>> {
    // Register user in Firebase first
    const firebaseResponse: ResponseResult<UserCredential, string> = await registerUserInFirebase(email, password);
    if (firebaseResponse.type === "success") {
        // Add entry to mongoDB
        const mongoResponse: ResponseResult<RTUser, string> = await verifyUserIsInMongoDB(firebaseResponse.data);
        if (mongoResponse.type === "success") {
            return respondSuccess(mongoResponse.data);
        }
        return respondError(JSON.stringify(mongoResponse.data));
    }
    return respondError(firebaseResponse.data);
}

export async function signInUser(email: string, password: string): Promise<ResponseResult<RTUser, string>> {
    const firebaseResponse: ResponseResult<UserCredential, string> = await signInUserInFirebase(email, password);
    if (firebaseResponse.type === "success") {
        // Add entry to mongoDB
        const mongoResponse: ResponseResult<RTUser, string> = await verifyUserIsInMongoDB(firebaseResponse.data);
        if (mongoResponse.type === "success") {
            return respondSuccess(mongoResponse.data);
        }
        return respondError(JSON.stringify(mongoResponse.data));
    }
    return respondError(firebaseResponse.data);
}

