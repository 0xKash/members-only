const { Router } = require("express");
const passport = require("passport");
const {
  renderIndex,
  renderLogin,
  renderRegister,
  registerUser,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", renderIndex);

indexRouter.get("/register", renderRegister);
indexRouter.post("/register", registerUser);

indexRouter.get("/login", renderLogin);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/register",
    successRedirect: "/success",
  })
);

indexRouter.get("/success", (req, res) =>
  req.isAuthenticated() ? res.render("success") : res.send("Not authorizated")
);

indexRouter.get("/logout", (req, res, next) => {
  req.logOut((err) => err && next(err));
  res.redirect("/login");
});

module.exports = indexRouter;
