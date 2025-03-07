import { Schema } from "firebase/vertexai"
import { DocumentTypes } from "../../common/constants"
import { RTDocument, RTDocumentComponent } from "../../common/database/RTDocument"
import { RTUser } from "../../common/database/RTUser"

export type UserSchema = {
    user_id: string,
    email: string
}

export type UserDocumentsSchema = {
    user_id: string,
    document_ids: string[]
}


export type DocumentSchema = {
    user_id: string,

    document_id: string
    document_display_name: string,

    type: DocumentTypes,
    components: DocumentComponentSchema[]
}


export type DocumentComponentSchema = {
    document_id: string,

    component_display_name: string,
    component_id: string,

    body: string
}


export function userToSchema(user: RTUser): UserSchema {
    return { user_id: user.userID, email: user.email };
}

export function schemaToUser(userSchema: UserSchema): RTUser {
    return { userID: userSchema.user_id, email: userSchema.email };
}

export function schemaToComponent(component: DocumentComponentSchema): RTDocumentComponent {
    return {
        documentID: component.component_id,
        componentDisplayName: component.component_display_name,
        componentID: component.component_id,
        body: component.body
    }
}


export function schemaToDocument(documentSchema: DocumentSchema): RTDocument {
    return {
        userID: documentSchema.user_id,
        documentID: documentSchema.document_id,
        documentDisplayName: documentSchema.document_display_name,
        type: documentSchema.type,
        components: documentSchema.components.map(componentSchema => schemaToComponent(componentSchema)),
    }
} 


