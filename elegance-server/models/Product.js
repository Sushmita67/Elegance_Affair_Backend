const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        stock: { type: Number, default: 0 },
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
