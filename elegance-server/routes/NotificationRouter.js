const express = require("express");
const router = express.Router();
const notificationController = require("../controller/NotificationController");

// Notification Routes
router.get("/", notificationController.getAllNotifications); // Get all notifications
router.get("/:id", notificationController.getNotificationById); // Get notification by ID
router.post("/", notificationController.createNotification); // Create notification
router.put("/:id", notificationController.updateNotification); // Update notification
router.delete("/:id", notificationController.deleteNotification); // Delete notification

module.exports = router;
