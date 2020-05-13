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
      createdAt: this.createdAt
    };
  }
}

module.exports = Users;
