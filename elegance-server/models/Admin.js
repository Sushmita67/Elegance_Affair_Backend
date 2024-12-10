const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "Admin" }, // Options: Admin, SuperAdmin
}, { timestamps: true });

module.exports = mongoose.model("Admin", AdminSchema);
