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

async function setMembership(id, membership) {
  await pool.query("UPDATE users SET membership_status = $1 WHERE id = $2", [
    membership.toString(),
    id,
  ]);
}

module.exports = {
  getUserByName,
  getUserById,
  createUser,
  setMembership,
};
