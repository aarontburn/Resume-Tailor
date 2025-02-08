import { Document } from "../../editor/Document";
import { UUID } from "../../types/DocTypes";

export interface User {
    userID: UUID,
    username: string,
    email: string,
    documents: Document[],
}