const express = require("express");
const router = express.Router();
const returnController = require("../controller/ReturnController");

// Return Routes
router.get("/:orderId", returnController.getReturnsByOrder); // Get returns for an order
router.post("/", returnController.createReturn); // Create return request
router.put("/:id", returnController.updateReturn); // Update return status
router.delete("/:id", returnController.deleteReturn); // Delete return request

module.exports = router;
