var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/restaurant";
var db = pgp(connectionString);

module.exports = db;