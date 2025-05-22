const express = require("express");
const router = express.Router();
const softwareController = require("../controllers/softwareController");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware,
  restrictTo("Admin"),
  softwareController.createSoftware
);

module.exports = router;
