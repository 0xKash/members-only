exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resoruce" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isadmin) {
    next();
  } else {
    res.status(401).json({
      msg: "You are not authorized to view this resoruce, you are not an admin",
    });
  }
};

exports.isMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user.membership_status) {
    res.redirect("/club-dashboard");
  } else {
    next();
  }
};
