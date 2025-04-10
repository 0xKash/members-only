const db = require("../db/queries");
const bcrypt = require("bcryptjs");

exports.renderIndex = (req, res) => {
  res.render("index");
};

exports.renderLogin = (req, res) => {
  res.render("login-form");
};

exports.renderRegister = (req, res) => {
  res.render("register-form");
};

exports.registerUser = async (req, res) => {
  const { username, password, confirm_password } = req.body;

  if (password === confirm_password) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      db.createUser(username, hashedPassword);
      console.log("ok");
      res.redirect("/login");
    } catch (err) {
      return err;
    }
  } else {
    console.log("fail");
  }
};
