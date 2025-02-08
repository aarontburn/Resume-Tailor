import { UUID } from "../../types/DocTypes";

export interface DocComponent {
    componentID: UUID,
    displayName: string, 
    body: string
}