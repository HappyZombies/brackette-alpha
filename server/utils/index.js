const bcrypt = require("bcrypt-nodejs");
const chance = require("chance")();

module.exports = {
  generatePasswordHash: (password) =>
    password ? bcrypt.hashSync(password, bcrypt.genSaltSync(8)) : "",
  validPassword: (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword),
  generateToken: () => chance.hash({ length: 10, casing: "upper" }),
  generateRoomCode: () => chance.hash({ length: 4, casing: "upper" }),
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
