if (process.env.NODE_ENV === "production") {
  throw new Error("Can't run seeds in production");
}

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex("tokens").del();
  // insert into db.
  await knex("tokens").insert([
    {
      token: "asdf123"
    },
    {
      userId: 1,
      token: "asdf1234"
    }
  ]);
};
