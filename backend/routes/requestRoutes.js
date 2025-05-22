const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware,
  restrictTo("Employee"),
  requestController.createRequest
);

router.patch(
  "/:id",
  authMiddleware,
  restrictTo("Manager"),
  requestController.updateRequest
);

router.get(
  '/',
  authMiddleware,
  restrictTo('Manager'),
  requestController.getPendingRequests    
);

module.exports = router;
