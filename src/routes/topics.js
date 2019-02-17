const express = require("express");
const router = express.Router();

const topicsController = require("../controllers/topicsController");

router.get("/topics", topicsController.index);
router.get("/topics/new", topicsController.new);
router.post("/topics/create", topicsController.create);
router.get("/topics/:id", topicsController.show);
router.post("/topics/:id/destroy", topicsController.destroy);
router.get("/topics/:id/edit", topicsController.edit);
router.post("/topics/:id/update", topicsController.update);

module.exports = router;