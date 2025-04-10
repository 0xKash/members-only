const { Router } = require("express");
const passport = require("passport");
const {
  renderIndex,
  renderLogin,
  renderRegister,
  registerUser,
  setMembership,
  createMessage,
  renderDashboard,
} = require("../controllers/indexController");
const { isAuth, isAdmin, isMember } = require("./authMiddleware");

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

indexRouter.get("/logout", (req, res, next) => {
  req.logOut((err) => err && next(err));
  res.redirect("/login");
});

indexRouter.get("/dashboard", isAuth, isMember, renderDashboard);
indexRouter.post("/dashboard", setMembership);

indexRouter.get("/club-dashboard", renderDashboard);

indexRouter.get("/admin", isAdmin, renderDashboard);

indexRouter.get("/message", (req, res) => res.render("message"));
indexRouter.post("/message", createMessage);

module.exports = indexRouter;
