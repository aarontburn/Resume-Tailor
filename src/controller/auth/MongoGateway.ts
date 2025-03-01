"use server";


import { UserCredential } from "firebase/auth";
import { Collection, Db, MongoClient, WithId, Document, MongoServerError } from "mongodb";
import { User } from "../../common/database/User";
import { respondError, respondSuccess, ResponseResult } from "../../common/Response";
import { schemaToUser, UserDocumentsSchema, UserSchema, userToSchema } from "../types/Schemas";


const DB_URL: string = `mongodb+srv://aarontburnham:${process.env.MONGO_PASSWORD}@userdocuments.s0ljn.mongodb.net/?retryWrites=true&w=majority&appName=UserDocuments`;
const DATABASE_NAME: string = "ResumeTailorDB";
const COLLECTIONS = {
    userCollection: "users",
    userDocuments: "documentsByUser",
    documentData: "documentData"
};

class MongoGateway {
    private static instance: MongoGateway | undefined = undefined;
    public static getInstance(): MongoGateway {
        return (this.instance ?? (this.instance = new MongoGateway()));
    }

    private client: MongoClient;
    private database: Db;

    constructor() {
        this.client = new MongoClient(DB_URL);
        this.database = this.client.db(DATABASE_NAME);
    }



    getUserCollection(): Collection<UserSchema> {
        return this.database.collection<UserSchema>(COLLECTIONS.userCollection);
    }

    getUserDocumentsCollection(): Collection<UserDocumentsSchema> {
        return this.database.collection<UserDocumentsSchema>(COLLECTIONS.userDocuments);
    }

    getDocumentDataCollection(): Collection {
        return this.database.collection(COLLECTIONS.documentData);
    }
}



export async function verifyUserIsInMongoDB(userCredentials: UserCredential): Promise<ResponseResult<User, string>> {
    const user: User = {
        userID: userCredentials.user.uid,
        email: userCredentials.user.email ?? "NO_REGISTERED_EMAIL"
    }
    const collection: Collection<UserSchema> = MongoGateway.getInstance().getUserCollection();
    try {
        await addUserToDatabaseIfNotExist(user);

        const userSchema: WithId<UserSchema> | null = await collection.findOne(userQuery(user));
        if (userSchema === null) {
            return respondError("Error inserting user into database.");
        }
        return respondSuccess(schemaToUser(userSchema));


    } catch (err) {
        if (err instanceof MongoServerError) {
            return respondError(`${err.code} | ${err.errorResponse.errmsg}`);
        }
        return respondError(JSON.stringify(err));
    }
}


async function addUserToDatabaseIfNotExist(user: User) {
    const userCollection: Collection<UserSchema> = MongoGateway.getInstance().getUserCollection();
    const userDocumentCollection: Collection<UserDocumentsSchema> = MongoGateway.getInstance().getUserDocumentsCollection();

    if (await userCollection.findOne(userQuery(user)) === null) {
        await userCollection.insertOne(userToSchema(user));
    }
    if (await userDocumentCollection.find(userQuery(user)) === null) {
        await userDocumentCollection.insertOne({ user_id: user.userID, document_ids: [] });
    }

}

function userQuery(user: User): { user_id: string } {
    return { user_id: user.userID };
}