const express = require("express");
const router = express.Router();
const adminController = require("../controller/AdminController");

// Admin Routes
router.get("/users", adminController.getAllUsers); // Fetch all users
router.get("/dashboard", adminController.getDashboardStats); // Fetch dashboard statistics
router.put("/user/role", adminController.updateUserRole); // Update user role
router.delete("/user/:userId", adminController.deleteUser); // Delete user

// Product Routes
router.get("/products", adminController.getAllProducts); // Get all products
router.post("/product", adminController.createProduct); // Create a new product
router.put("/product/:productId", adminController.updateProduct); // Update product
router.delete("/product/:productId", adminController.deleteProduct); // Delete product

// Order Routes
router.get("/orders", adminController.getAllOrders); // Get all orders
router.put("/order/status", adminController.updateOrderStatus); // Update order status

// Inventory Routes
router.get("/inventory", adminController.getInventory); // Get all inventory items
router.put("/inventory", adminController.updateInventoryStock); // Update inventory stock

module.exports = router;
