const express = require("express");
const router = express.Router();
const inventoryController = require("../controller/InventoryController");

// Inventory Routes
router.get("/", inventoryController.getAllInventoryItems); // Get all inventory items
router.put("/:id", inventoryController.updateInventoryItem); // Update inventory item

module.exports = router;
