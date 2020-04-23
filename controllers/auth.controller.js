const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const db = require("../db.js");

const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = db
    .get("users")
    .find({ email: email })
    .value();

  if (!user) {
    res.render("auth/login", {
      errors: ["User does not exist."],
      values: req.body
    });

    return;
  }

  if (!user.wrongLoginCount) {
    db.get("users")
      .find({ id: user.id })
      .set("wrongLoginCount", 0)
      .write();
  }

  if (user.wrongLoginCount >= 4) {
    let msg = {
      to: user.email,
      from: "aquaydeptrai4@gmail.com",
      subject: "Your account has been locked.",
      text:
        "Your account has been locked, because you entered the wrong password more than the specified number of times",
      html: "<strong>Contact us if there is a mistake</strong>"
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log(error);
    }

    res.render("auth/login", {
      errors: ["Your account has been locked."],
      values: req.body
    });

    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    db.get("users")
      .find({ id: user.id })
      .assign({ wrongLoginCount: (user.wrongLoginCount += 1) })
      .write();

    res.render("auth/login", {
      errors: ["Wrong password."],
      values: req.body
    });

    return;
  }

  res.cookie("userId", user.id, {
    signed: true
  });
  res.redirect("/users");
};
