"use server";


import { Collection, WithId } from "mongodb";
import { MongoGateway } from "./MongoGateway";
import { DocumentSchema, schemaToDocument, UserDocumentsSchema } from "../types/Schemas";
import { log } from "../../common/log";
import { respondError, respondSuccess, ResponseResult } from "../../common/Response";
import { UUID } from "@/common/constants";
import { DocumentTypes } from "../../common/constants";
import { generateUUID } from "../../common/helper";
import { RTDocument } from "../../common/database/RTDocument";
import { getCookie } from "../../common/cookies/cookie_handler";
import { COOKIE_USER_ID } from "../../common/cookies/cookie_keys";
import HTTPStatusCode from "../../common/HTTPStatusCode";


export async function retrieveDocumentDetails(documentID: string): Promise<ResponseResult<RTDocument, HTTPStatusCode>> {
    const userIDResponse: ResponseResult<string, undefined> = await getCookie(COOKIE_USER_ID);
    if (userIDResponse.type === "failure") {
        log(`ERROR: Attempted to access document without user ID stored in cookies.
            \tdocumentID: ${documentID}`);
        return respondError(HTTPStatusCode.UNAUTHORIZED);
    }
    const docCollection: Collection<DocumentSchema> = MongoGateway.getInstance().getDocumentDataCollection();
    const docSchema: WithId<DocumentSchema> | null = await docCollection.findOne({ user_id: userIDResponse.data, document_id: documentID });

    if (docSchema === null) {
        log(`ERROR: Could not find document.
            \tdocumentID: ${documentID}
            \tuserID: ${userIDResponse.data}`);
        return respondError(HTTPStatusCode.NOT_FOUND);
    }

    return respondSuccess(schemaToDocument(docSchema));

}

export async function retrieveDocumentIDs(): Promise<ResponseResult<string[], HTTPStatusCode>> {
    const userIDResponse: ResponseResult<string, undefined> = await getCookie(COOKIE_USER_ID);
    if (userIDResponse.type === "failure") {
        log(`ERROR: Attempted to create document without user ID stored in cookies.`);
        return respondError(HTTPStatusCode.UNAUTHORIZED);
    }

    const docCollection: Collection<UserDocumentsSchema> = MongoGateway.getInstance().getUserDocumentsCollection();
    const docSchema: WithId<UserDocumentsSchema> | null = await docCollection.findOne({ user_id: userIDResponse.data });
    if (docSchema === null) {
        log(`ERROR: Could not find documents.
            \tuserID: ${userIDResponse.data}`);
        return respondError(HTTPStatusCode.NOT_FOUND);
    }

    return respondSuccess(docSchema.document_ids);
}




export async function createNewDocument(docType: DocumentTypes): Promise<ResponseResult<UUID, HTTPStatusCode>> {
    const userIDResponse: ResponseResult<string, undefined> = await getCookie(COOKIE_USER_ID);
    if (userIDResponse.type === "failure") {
        log(`ERROR: Attempted to create document without user ID stored in cookies.`);
        return respondError(HTTPStatusCode.UNAUTHORIZED);
    }


    const newDocumentUUID: UUID = generateUUID();

    const userDocCollection: Collection<UserDocumentsSchema> = MongoGateway.getInstance().getUserDocumentsCollection();
    const docCollection: Collection<DocumentSchema> = MongoGateway.getInstance().getDocumentDataCollection();

    log(`Creating new document: 
        \tuserID: ${userIDResponse.data}
        \tdocumentID: ${newDocumentUUID}`);

    try {
        await Promise.all([
            docCollection.insertOne({
                user_id: userIDResponse.data,
                document_id: newDocumentUUID,
                document_display_name: "Untitled Document",
                type: docType,
                components: []
            }),

            userDocCollection.updateOne({ user_id: userIDResponse.data }, { "$push": { document_ids: newDocumentUUID } })
        ]);
        return respondSuccess(newDocumentUUID);

    } catch (err) {
        log(`ERROR: Error creating ${newDocumentUUID} for user ${userIDResponse.data}`);
        log(err);
        return respondError(HTTPStatusCode.BAD_REQUEST);
    }

}