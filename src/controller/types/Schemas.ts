import { User } from "../../common/database/User"

export type UserSchema = {
    user_id: string,
    email: string
}

export type UserDocumentsSchema = {
    user_id: string,
    document_ids: string[]
}

export function userToSchema(user: User): UserSchema {
    return { user_id: user.userID, email: user.email };
}

export function schemaToUser(userSchema: UserSchema): User {
    return { userID: userSchema.user_id, email: userSchema.email };
}