const bcrypt = require("bcrypt");
const shortid = require("shortid");

const db = require("../db.js");

const saltRounds = 10;

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.create = async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPassword;
  req.body.id = shortid.generate();

  db.get("users")
    .push(req.body)
    .write();

  res.redirect("back");
};

module.exports.idUpdate = (req, res) => {
  let id = req.params.id;

  res.render("users/update-name", {
    id: id
  });
};

module.exports.update = (req, res) => {
  db.get("users")
    .find({ id: req.body.id })
    .assign({ name: req.body.name })
    .write();

  res.redirect("/users");
};

module.exports.delete = (req, res) => {
  let id = req.params.id;

  db.get("users")
    .remove({ id: id })
    .write();

  res.redirect("back");
};
