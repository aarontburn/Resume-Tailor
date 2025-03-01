"use server";


import { Collection, WithId } from "mongodb";
import { MongoGateway } from "./MongoGateway";
import { UserDocumentsSchema } from "../types/Schemas";
import { log } from "../../common/log";
import { respondError, respondSuccess, ResponseResult } from "../../common/Response";




export async function retrieveDocumentIDsFromUserID(userID: string): Promise<ResponseResult<string[], undefined>> {
    const docCollection: Collection<UserDocumentsSchema> = MongoGateway.getInstance().getUserDocumentsCollection();
    const docSchema: WithId<UserDocumentsSchema> | null = await docCollection.findOne({ user_id: userID });
    if (docSchema === null) {
        log("ERROR: Could not retrieve documents for user " + userID);
        return respondError(undefined);
    }

    return respondSuccess(docSchema.document_ids);
}