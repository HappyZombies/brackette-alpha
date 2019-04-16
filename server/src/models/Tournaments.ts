import { Model, RelationMappings } from "objection";
import User from "./Users";
import { join } from "path";

enum Hosters {
  CHALLONGE = "CHALLONGE",
  SMASHGG = "SMASHGG"
}

class Tournaments extends Model {
  static tableName = "tournaments";
  readonly id!: number;
  userId!: number | null;
  hosters!: Hosters;
  socketId!: string;
  tournamentId!: string;
  nickname: string;
  players: any;
  openMatches: any;
  roomCode!: string;
  subdomain: string;
  limit: number;
  createdAt?: Date;
  updatedAt?: Date;

  // optional relations
  user?: User;

  static jsonSchema = {
    type: "object",
    required: ["hosters", "socketId", "tournamentId", "roomCode"],
    properties: {
      id: { type: "integer" },
      userId: { type: "integer" },
      hosters: { type: "string" },
      socketId: { type: "string" },
      tournamentId: { type: "string" },
      nickname: { type: "string" },
      players: { type: "object" },
      openMatches: { type: "object" },
      roomCode: { type: "string" },
      subdomain: { type: "string" },
      limit: { type: "integer" }
    }
  };
  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: join(__dirname, "Users"),
      join: {
        from: "tournaments.userId",
        to: "users.id"
      }
    }
  };
}

export default Tournaments;
