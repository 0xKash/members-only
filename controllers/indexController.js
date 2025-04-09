const db = require("../db/queries");

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
  const dbData = await db.getUserByName(username);

  if (password === confirm_password) {
    try {
      db.createUser(username, password);
      console.log("ok");
      res.redirect("/login");
    } catch (err) {
      return err;
    }
  } else {
    console.log("fail");
  }
};
