import { UUID } from "../../types/DocTypes";
import { DocComponent } from "./DocComponent";

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