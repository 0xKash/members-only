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

indexRouter.get("/login", renderLogin);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/register",
    successRedirect: "/success",
  })
);

indexRouter.get("/register", renderRegister);
indexRouter.post("/register", registerUser);

indexRouter.get("/success", (req, res) => res.send("<h1>Success!</h1>"));

module.exports = indexRouter;
