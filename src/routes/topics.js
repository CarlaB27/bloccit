const express = require("express");
const router = express.Router();

const topicsController = require("../controllers/topicsController");

router.get("/topics", topicsController.index);

module.exports = router;