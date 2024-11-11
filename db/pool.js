const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: "postgres",
  database: "top_users",
  password: "1234",
  port: 5432 // The default port
});
