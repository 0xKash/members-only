const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost",
  user: "postgres",
  database: "members_only",
  password: "1234",
  port: 5432,
});
