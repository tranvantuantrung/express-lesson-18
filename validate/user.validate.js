const db = require("../db.js");

module.exports.create = (req, res, next) => {
  let errors = [];

  if (!req.body.name) {
    errors.push("Name is required.");
  }

  if (req.body.name.split("").length > 30) {
    errors.push("Name must be less than 30 characters.");
  }
  
  if (!req.body.email) {
    errors.push("Email is required.");
  }
  
  let user = db.get('users').find({email: req.body.email }).value();
  
  if (user) {
    errors.push("User already exists.")
  }
  
  if (!req.body.password) {
    errors.push("Password is required.");
  }

  if (errors.length) {
    res.render("users/index", {
      users: db.get("users").value(),
      errors,
      values: req.body
    });

    return;
  }

  next();
};
