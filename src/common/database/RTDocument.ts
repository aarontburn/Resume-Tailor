import { UUID } from "../constants";
import { DocumentTypes } from "../constants";

export interface RTDocument {
    userID: UUID,

    documentID: UUID,
    documentDisplayName: string,

    type: DocumentTypes,
    components: RTDocumentComponent[];
}

export interface RTDocumentComponent {
    documentID: UUID,

    componentDisplayName: string,
    componentID: UUID,

    body: string
}