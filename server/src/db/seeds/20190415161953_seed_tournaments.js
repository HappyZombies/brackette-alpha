if (process.env.NODE_ENV === "production") {
  throw new Error("Can't run seeds in production");
}

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex("tournaments").del();
  // insert into db.
  await knex("tournaments").insert([
    {
      id: 1,
      userId: 1,
      hoster: "CHALLONGE",
      socketId: "123",
      tournamentId: "123asd",
      nickname: "My Tournament",
      players: null,
      openMatches: null,
      roomCode: "1234",
      subdomain: null
    }
  ]);
};
