const bcrypt = require("bcrypt-nodejs");

module.exports = {
  generateHash: password =>
    password ? bcrypt.hashSync(password, bcrypt.genSaltSync(8)) : "",
  validPassword: (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword),
  generateToken: () => (rand() + rand()).toUpperCase(),
  generateRoomCode: () => rand().toUpperCase()
};
