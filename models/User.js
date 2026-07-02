const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    // Profile Fields
    salary: {
        type: Number,
        default: 0,
    },

    company: {
        type: String,
        default: "",
        trim: true,
    },

    role: {
        type: String,
        default: "",
        trim: true,
    },

    experience: {
        type: String,
        default: "",
        trim: true,
    },

    location: {
        type: String,
        default: "",
        trim: true,
    },

    // Settings Fields
    currency: {
        type: String,
        default: "INR",
        enum: ["INR", "USD", "EUR"],
    },

    darkMode: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);