const express = require("express");

const controller = require("../controllers/transaction.controller.js");

const router = express.Router();

router.get("/", controller.index);

router.post("/", controller.create);

router.get("/:id/complete", controller.complete);

module.exports = router;
