const express = require("express");

const controller = require("../controllers/user.controller.js");
const validate = require("../validate/user.validate.js");

const router = express.Router();

router.get("/", controller.index);

router.post("/", validate.create, controller.create);

router.get("/:id/update", controller.idUpdate);

router.post("/update", controller.update);

router.get("/:id/delete", controller.delete);

module.exports = router;
