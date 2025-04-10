const pool = require("./pool");

async function getUserByName(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return rows;
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows;
}

async function createUser(username, password) {
  await pool.query(
    "INSERT INTO users (username, password, membership_status, isAdmin) VALUES ($1, $2, false, true)",
    [username, password]
  );
}

module.exports = {
  getUserByName,
  getUserById,
  createUser,
};
