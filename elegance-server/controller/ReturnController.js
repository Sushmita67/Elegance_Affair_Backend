const Return = require("../models/Return");
const Order = require("../models/Order");

// Request a return
const requestReturn = async (req, res) => {
    try {
        const { orderId, reason } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        const newReturn = new Return({
            orderId,
            reason,
            status: "Pending",
            dateRequested: new Date(),
        });

        await newReturn.save();
        res.status(201).json({ message: "Return requested successfully.", return: newReturn });
    } catch (error) {
        res.status(500).json({ message: "Failed to request return.", error: error.message });
    }
};

// View return requests
const viewReturns = async (req, res) => {
    try {
        const returns = await Return.find().populate("orderId", "productId quantity");
        res.status(200).json(returns);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch return requests.", error: error.message });
    }
};

module.exports = {
    requestReturn,
    viewReturns,
};
