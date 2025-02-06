import { DocComponent } from "./DocComponent";

export interface DocumentMetadata {
    last_edited: string // date
    
}

export interface Document {
    id: string;

    components: DocComponent[];
}