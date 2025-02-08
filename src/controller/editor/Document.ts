import { UUID } from "../types/DocTypes";

export interface DocumentMetadata {
    last_edited: string // date
    
}

export interface Document {
    userID: UUID,
    displayName: string,
    documentID: UUID,
    type: "latex" | "html",
    components: DocComponent[];
}


export interface DocComponent {
    componentID: UUID,
    displayName: string, 
    body: string
}