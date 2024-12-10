const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");

// Fetch all registered users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users.", error: error.message });
    }
};

// Fetch dashboard statistics (user count, order count, product count, total revenue)
const getDashboardStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const orderCount = await Order.countDocuments();
        const productCount = await Product.countDocuments();
        const totalRevenue = await Order.aggregate([
            { $match: { status: "Paid" } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]);

        res.status(200).json({
            users: userCount,
            orders: orderCount,
            products: productCount,
            revenue: totalRevenue[0]?.total || 0,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching dashboard stats.", error: error.message });
    }
};

// Update user role (admin can change roles)
const updateUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User role updated successfully.", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user role.", error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user.", error: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products.", error: error.message });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: "Product created successfully.", product });
    } catch (error) {
        res.status(500).json({ message: "Error creating product.", error: error.message });
    }
};

// Update product details
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json({ message: "Product updated successfully.", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product.", error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product.", error: error.message });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("userId productId");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders.", error: error.message });
    }
};

// Update order status (e.g., mark as 'Shipped', 'Delivered')
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json({ message: "Order status updated successfully.", updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status.", error: error.message });
    }
};

// Get inventory details
const getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: "Error fetching inventory.", error: error.message });
    }
};

// Update inventory stock
const updateInventoryStock = async (req, res) => {
    try {
        const { inventoryId, stock } = req.body;
        const updatedInventory = await Inventory.findByIdAndUpdate(inventoryId, { stock }, { new: true });

        if (!updatedInventory) {
            return res.status(404).json({ message: "Inventory item not found." });
        }

        res.status(200).json({ message: "Inventory stock updated successfully.", updatedInventory });
    } catch (error) {
        res.status(500).json({ message: "Error updating inventory stock.", error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getDashboardStats,
    updateUserRole,
    deleteUser,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllOrders,
    updateOrderStatus,
    getInventory,
    updateInventoryStock,
};
