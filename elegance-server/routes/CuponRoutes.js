const express = require("express");
const router = express.Router();
const couponController = require("../controller/CouponController");

// Coupon Routes
router.get("/", couponController.getAllCoupons); // Get all coupons
router.get("/:id", couponController.getCouponById); // Get coupon by ID
router.post("/", couponController.createCoupon); // Create new coupon
router.put("/:id", couponController.updateCoupon); // Update coupon
router.delete("/:id", couponController.deleteCoupon); // Delete coupon

module.exports = router;
