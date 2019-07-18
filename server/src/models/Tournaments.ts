import { Model, RelationMappings } from "objection";
import * as Joi from "joi";
import { join } from "path";
import User from "./Users";

enum Hosters {
  CHALLONGE = "CHALLONGE",
  SMASHGG = "SMASHGG"
}

class Tournaments extends Model {
  static tableName = "tournaments";
  readonly id!: number;
  userId!: number | null;
  hoster!: Hosters;
  socketId: string;
  tournamentId!: string;
  nickname: string;
  players: any;
  openMatches: any;
  devices: any;
  roomCode!: string;
  subdomain: string;
  limit: number;
  archived: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  // optional relations
  user?: User;

  static jsonSchema = {
    type: "object",
    required: ["hoster", "tournamentId", "roomCode"],
    properties: {
      id: { type: "integer" },
      userId: { type: "integer" },
      hoster: { type: "string" },
      socketId: { type: "string" },
      tournamentId: { type: "string" },
      nickname: { type: "string" },
      players: { type: "object" },
      openMatches: { type: "object" },
      devices: { type: "object" },
      roomCode: { type: "string" },
      subdomain: { type: "string" },
      limit: { type: "integer" },
      archived: { type: "boolean" }
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
