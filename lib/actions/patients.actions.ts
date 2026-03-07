import { InputFile } from 'node';
'use server'
import { Databases, ID, Query } from "node-appwrite"
import { BUCKET_ID, DATABASE_ID, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils";

import { InputFile } from "node-appwrite/file";

export const createUser = async (user : CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(), 
            user.email, 
            user.phone, 
            undefined, 
            user.name
        )
        console.log({newUser});

        return parseStringify(newUser);
    } catch (error: any) {
        // Check if user already exists 
        if(error && error?.code ===409) {
            const existingUser = await users.list([
                Query.equal('email', [user.email]),
            ]);

            return existingUser.users[0];
        }
    }
};

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);

        return parseStringify(user);
    } catch (error) {
        console.log(error);
    }
}

export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
    try {
        let file;

        if(identificationDocument){
            const inputFile = InputFile.fromBuffer(identificationDocument?.get('blobFile') as Blob,
            identificationDocument?.get('fileName') as string,
        )

        file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
        }

        const patient = await Databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocument: file?.$id || null,
                identificationDocumentUrl: `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
                ...patient
            }
        )
    } catch (error) {
        console.log(error);
    }
}