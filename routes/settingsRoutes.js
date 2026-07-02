const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getSettings,
    updateSettings,
} = require("../controllers/settingsController");

// Get Settings
router.get("/", protect, getSettings);

// Update Settings
router.put("/", protect, updateSettings);

module.exports = router;