"use server";

import { UserCredential } from "firebase/auth";
import { respondError, respondSuccess, ResponseResult } from "../../common/Response";
import { User } from "../../common/database/User";
import { registerUserInFirebase, signInUserInFirebase } from "./FirebaseGateway";
import { verifyUserIsInMongoDB } from "./MongoGateway";


export async function registerUser(email: string, password: string): Promise<ResponseResult<User, string>> {
    // Register user in Firebase first
    const firebaseResponse: ResponseResult<UserCredential, string> = await registerUserInFirebase(email, password);
    if (firebaseResponse.type === "success") {
        // Add entry to mongoDB
        const mongoResponse: ResponseResult<User, string> = await verifyUserIsInMongoDB(firebaseResponse.body);
        if (mongoResponse.type === "success") {
            return respondSuccess(mongoResponse.body);
        }
        return respondError(JSON.stringify(mongoResponse.body));
    }
    return respondError(firebaseResponse.body);
}

export async function signInUser(email: string, password: string): Promise<ResponseResult<User, string>> {
    const firebaseResponse: ResponseResult<UserCredential, string> = await signInUserInFirebase(email, password);
    if (firebaseResponse.type === "success") {
        // Add entry to mongoDB
        const mongoResponse: ResponseResult<User, string> = await verifyUserIsInMongoDB(firebaseResponse.body);
        if (mongoResponse.type === "success") {
            return respondSuccess(mongoResponse.body);
        }
        return respondError(JSON.stringify(mongoResponse.body));
    }
    return respondError(firebaseResponse.body);
}

