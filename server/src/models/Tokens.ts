import { Model, RelationMappings } from "objection";
import User from "./Users";
import { join } from "path";

class Tokens extends Model {
  static tableName = "tokens";
  readonly id!: number;
  userId!: number | null;
  token!: string;
  createdAt?: Date;
  updatedAt?: Date;

  // optional relations
  user?: User;

  static jsonSchema = {
    type: "object",
    required: ["token"],
    properties: {
      id: { type: "integer" },
      userId: { type: "integer" },
      token: { type: "string", maxLength: 255 }
    }
  };
  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: join(__dirname, "Users"),
      join: {
        from: "tokens.userId",
        to: "users.id"
      }
    }
  };
}

export default Tokens;
