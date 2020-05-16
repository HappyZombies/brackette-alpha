const bcrypt = require("bcrypt-nodejs");

module.exports = {
  generateHash: (password) =>
    password ? bcrypt.hashSync(password, bcrypt.genSaltSync(8)) : "",
  validPassword: (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword),
  generateToken: () => (rand() + rand()).toUpperCase(),
  generateRoomCode: () => rand().toUpperCase(),
  retrieveJwt: (headers) => {
    if (!headers || !headers.authorization) {
      return null;
    }
    const parts = headers.authorization.split(" ");
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (scheme === "Bearer") {
        return credentials;
      }
    }
    return null;
  },
};
