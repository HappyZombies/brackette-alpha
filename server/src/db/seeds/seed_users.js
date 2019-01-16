const bcrypt = require("bcrypt-nodejs");

if (process.env.NODE_ENV === "production") {
  throw new Error("Can't run seeds in production");
}

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  await knex("users").del();
  // insert into db.
  await knex("users").insert([
    {
      username: "danielreguero",
      email: "dreguero@hotmail.com",
      displayName: "Daniel R.",
      password: bcrypt.hashSync("password", bcrypt.genSaltSync(8), null)
    },
    {
      username: "peterparker",
      email: "peterparker@hotmail.com",
      displayName: "Peter P.",
      password: bcrypt.hashSync("password1", bcrypt.genSaltSync(8), null)
    }
  ]);
};
