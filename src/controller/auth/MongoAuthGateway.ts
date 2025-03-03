import { UserCredential } from "firebase/auth";
import { Collection, WithId, MongoServerError } from "mongodb";
import { RTUser } from "../../common/database/RTUser";
import { ResponseResult, respondError, respondSuccess } from "../../common/Response";
import { MongoGateway } from "../database/MongoGateway";
import { UserSchema, schemaToUser, UserDocumentsSchema, userToSchema } from "../types/Schemas";


export async function verifyUserIsInMongoDB(userCredentials: UserCredential): Promise<ResponseResult<RTUser, string>> {
    const user: RTUser = {
        userID: userCredentials.user.uid,
        email: userCredentials.user.email ?? "NO_REGISTERED_EMAIL"
    };
    const collection: Collection<UserSchema> = MongoGateway.getInstance().getUserCollection();
    try {
        await addUserToDatabaseIfNotExist(user);

        const userSchema: WithId<UserSchema> | null = await collection.findOne(MongoGateway.userQuery(user));
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


async function addUserToDatabaseIfNotExist(user: RTUser) {
    const userCollection: Collection<UserSchema> = MongoGateway.getInstance().getUserCollection();
    const userDocumentCollection: Collection<UserDocumentsSchema> = MongoGateway.getInstance().getUserDocumentsCollection();

    if (await userCollection.findOne(MongoGateway.userQuery(user)) === null) {
        await userCollection.insertOne(userToSchema(user));
    }
    if (await userDocumentCollection.find(MongoGateway.userQuery(user)) === null) {
        await userDocumentCollection.insertOne({ user_id: user.userID, document_ids: [] });
    }

}


