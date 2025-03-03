import { DocumentTypes as DocumentType } from "../../common/constants"
import { RTDocument, RTDocumentComponent } from "../../common/database/RTDocument"
import { RTUser } from "../../common/database/RTUser"

type Mapping<Schema extends keyof Schema, Object extends keyof Object> = {
    [key: Schema]: value 
}


const UserMapping: UserSchema = {
    user_id: ,
}
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

    type: DocumentType,
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

// export function schemaToDocument(document: DocumentSchema): RTDocument {
//     const components: RTDocumentComponent[] = [];
//     return 


// } 


