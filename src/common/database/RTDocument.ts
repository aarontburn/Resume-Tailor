import { UUID } from "../../controller/types/DocTypes";

export interface RTDocument {
    userID: UUID,

    documentID: UUID,
    documentDisplayName: string,

    type: DocumentType,
    components: RTDocumentComponent[];
}

export interface RTDocumentComponent {
    documentID: UUID,

    componentDisplayName: string,
    componentID: UUID,

    body: string
}