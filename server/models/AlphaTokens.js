const { Model } = require("objection");
const Users = require("./Users");

class AlphaTokens extends Model {
  static get tableName() {
    return "alpha_tokens";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: "alpha_tokens.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = AlphaTokens;
