const { Client } = require("pg");
const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 255 ),
    password VARCHAR ( 255 ),
    membership_status BOOLEAN,
    isAdmin BOOLEAN
);
`;

const SQL2 = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id VARCHAR ( 255 ),
    message VARCHAR ( 255 ),
    date DATE
);
`;

const SQL3 = `
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)

WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://postgres:1234@localhost:5432/members_only",
  });

  await client.connect();
  await client.query(SQL);
  await client.query(SQL2);
  await client.query(SQL3);
  await client.end();
  console.log("done");
}

main();
