const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../db/queries");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log(username, password);

    try {
      const rows = await db.getUserByName(username);

      console.log(rows);

      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const rows = await db.getUserById(id);

    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
