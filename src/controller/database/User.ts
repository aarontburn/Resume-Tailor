import { UUID } from "mongodb";
import { Document } from "../editor/components/Document";

export interface User {
    userID: UUID,
    email: string,
    documents: Document[]
}