const express = require("express");

const controller = require("../controllers/book.controller.js");

const router = express.Router();

router.get("/", controller.index);

router.post("/", controller.create);

router.get("/:id/update", controller.idUpdate);

router.post("/update", controller.update);

router.get("/:id/delete", controller.delete);

module.exports = router;
