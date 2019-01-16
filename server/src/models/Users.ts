import { Model } from "objection";

export default class User extends Model {
    static tableName = 'users';
    readonly id!: number;
    username!: string;
    email!: string;
    password!: string;
    displayName!: string;
    facebookKey?: string;
    challongeKey?: string;
    smashggKey?: string;
    createdAt?: Date;
    updatedAt?: Date;

    static jsonSchema = {
        type: "object",
        required: ["username", "email", "displayName", "password"],
        properties: {
            id: { type: "integer" },
            username: { type: "string", minLength: 3, maxLength: 255 },
            email: { type: "string", minLength: 3, maxLength: 255 },
            displayName: { type: "string", minLength: 3, maxLength: 255 },
            password: { type: "string", minLength: 8, maxLength: 255 },
            facebookKey: { type: ["string", "null"] },
            challongeKey: { type: ["string", "null"] },
            smashggKey: { type: ["string", "null"] }
        }
    };
}
