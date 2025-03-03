"use server";


import { Collection, WithId } from "mongodb";
import { MongoGateway } from "./MongoGateway";
import { DocumentSchema, UserDocumentsSchema } from "../types/Schemas";
import { log } from "../../common/log";
import { respondError, respondSuccess, ResponseResult } from "../../common/Response";
import { UUID } from "../types/DocTypes";
import { DocumentTypes } from "../../common/constants";
import { generateUUID } from "../../common/helper";




export async function retrieveDocumentIDsFromUserID(userID: string): Promise<ResponseResult<string[], undefined>> {
    const docCollection: Collection<UserDocumentsSchema> = MongoGateway.getInstance().getUserDocumentsCollection();
    const docSchema: WithId<UserDocumentsSchema> | null = await docCollection.findOne({ user_id: userID });
    if (docSchema === null) {
        log("ERROR: Could not retrieve documents for user " + userID);
        return respondError(undefined);
    }

    return respondSuccess(docSchema.document_ids);
}




export async function createNewDocument(userID: UUID, docType: DocumentTypes): Promise<ResponseResult<UUID, string>> {
    const newDocumentUUID: UUID = generateUUID();

    const userDocCollection: Collection<UserDocumentsSchema> = MongoGateway.getInstance().getUserDocumentsCollection();
    const docCollection: Collection<DocumentSchema> = MongoGateway.getInstance().getDocumentDataCollection();

    log(`Creating new document: 
        \tuserID: ${userID}
        \tdocumentID: ${newDocumentUUID}
        `);

    try {
        await Promise.all([
            docCollection.insertOne({
                user_id: userID,
                document_id: newDocumentUUID,
                document_display_name: "Untitled Document",
                type: docType,
                components: []
            }),

            userDocCollection.updateOne({ user_id: userID }, { "$push": { document_ids: newDocumentUUID } })
        ]);
        return respondSuccess(newDocumentUUID);

    } catch (err) {
        return respondError(`ERROR: Error creating ${newDocumentUUID} for user ${userID}`);
    }

}