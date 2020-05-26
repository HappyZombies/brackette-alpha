const { Model } = require("objection");

class AlphaTokens extends Model {
  static get tableName() {
    return "alpha_tokens";
  }
  static get relationMappings() {
    const Users = require("./Users");
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
