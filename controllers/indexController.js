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

exports.renderDashboard = async (req, res) => {
  const messages = await db.getMessages();
  if (req.user.isadmin) {
    res.render("admin-dashboard", { messages: messages });
  } else if (req.user.membership_status || req.user.isadmin) {
    res.render("club-dashboard", { messages: messages });
  } else {
    res.render("dashboard", { messages: messages });
  }
};

exports.setMembership = async (req, res) => {
  if (req.body.password === "secret") {
    db.setMembership(req.user.id, true);
    res.redirect("/club-dashboard");
  } else {
    console.log(req.user);
    res.redirect("/dashboard");
  }
};

exports.createMessage = async (req, res) => {
  await db.createMessage(req.user.id, req.user.username, req.body.message);
  res.redirect("/dashboard");
};
