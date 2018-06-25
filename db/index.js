var pgp = require("pg-promise")({});
var connectionString = process.env.DATABASE_URL; /* dev connection: "postgres://localhost/restaurant"; */
var db = pgp(connectionString);

module.exports = db;