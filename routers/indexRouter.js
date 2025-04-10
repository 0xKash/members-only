const { Router } = require("express");
const passport = require("passport");
const {
  renderIndex,
  renderLogin,
  renderRegister,
  registerUser,
} = require("../controllers/indexController");
const { isAuth, isAdmin } = require("./authMiddleware");

const indexRouter = Router();

indexRouter.get("/", renderIndex);

indexRouter.get("/register", renderRegister);
indexRouter.post("/register", registerUser);

indexRouter.get("/login", renderLogin);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/register",
    successRedirect: "/dashboard",
  })
);

indexRouter.get("/dashboard", isAuth, (req, res) => res.render("dashboard"));

indexRouter.get("/logout", (req, res, next) => {
  req.logOut((err) => err && next(err));
  res.redirect("/login");
});

indexRouter.get("/admin", isAdmin, (req, res) => res.send("You are an admin"));

module.exports = indexRouter;
