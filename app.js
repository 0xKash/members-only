const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const app = express();
const path = require("node:path");

const pool = require("./db/pool");

const indexRouter = require("./routers/indexRouter");
const passport = require("passport");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

require("./config/passport");

app.use(
  session({
    store: new pgSession({
      pool: pool, // Connection pool
      tableName: "session", // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(3000, () => console.log("App started - Port: 3000"));
