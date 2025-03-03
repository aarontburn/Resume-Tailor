
import { Collection, Db, MongoClient } from "mongodb";
import { DocumentSchema, UserDocumentsSchema, UserSchema } from "../types/Schemas";
import { RTUser } from "../../common/database/RTUser";


const DB_URL: string = `mongodb+srv://aarontburnham:${process.env.MONGO_PASSWORD}@userdocuments.s0ljn.mongodb.net/?retryWrites=true&w=majority&appName=UserDocuments`;
const DATABASE_NAME: string = "ResumeTailorDB";
const COLLECTIONS = {
    userCollection: "users",
    userDocuments: "documentsByUser",
    documentData: "documentData"
} as const;

export class MongoGateway {
    private static instance: MongoGateway | undefined = undefined;
    public static getInstance(): MongoGateway {
        return (this.instance ?? (this.instance = new MongoGateway()));
    }

    private client: MongoClient;
    private database: Db;

    constructor() {
        this.client = new MongoClient(DB_URL);
        this.database = this.client.db(DATABASE_NAME);
    }

    getUserCollection(): Collection<UserSchema> {
        return this.database.collection<UserSchema>(COLLECTIONS.userCollection);
    }

    getUserDocumentsCollection(): Collection<UserDocumentsSchema> {
        return this.database.collection<UserDocumentsSchema>(COLLECTIONS.userDocuments);
    }

    getDocumentDataCollection(): Collection<DocumentSchema> {
        return this.database.collection(COLLECTIONS.documentData);
    }

    public static userQuery(user: RTUser): { user_id: string; } {
        return { user_id: user.userID };
    }
    
}



