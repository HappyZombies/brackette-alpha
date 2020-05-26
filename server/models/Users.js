const { Model } = require("objection");

class Users extends Model {
  static get tableName() {
    return "users";
  }
  $formatJson() {
    return {
      username: this.username,
      email: this.email,
      displayName: this.displayName,
      facebookKey: this.facebookKey,
      challongeKey: this.challongeKey,
      smashggKey: this.smashggKey,
      admin: this.role,
      updateAt: this.updateAt,
      createdAt: this.createdAt,
    };
  }
  static get relationMappings() {
    const AlphaTokens = require("./AlphaTokens");
    return {
      alphaTokens: {
        relation: Model.HasOneRelation,
        modelClass: AlphaTokens,
        join: {
          from: "users.id",
          to: "alpha_tokens.userId",
        },
      },
    };
  }
}

module.exports = Users;
