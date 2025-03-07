import { DocumentTypes } from "../../common/constants";
import { UUID } from "@/common/constants";

export interface DocumentMetadata {
    last_edited: string // date
}

export interface Document {
    userID: UUID,
    displayName: string,
    documentID: UUID,
    type: DocumentTypes,
    components: DocComponent[];
}


export interface DocComponent {
    componentID: UUID,
    displayName: string, 
    body: string
}