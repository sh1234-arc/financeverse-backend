const express = require("express");
const router = express.Router();

const {
    addIncome,
    getIncome,
    deleteIncome,
} = require("../controllers/incomeController");

const protect = require("../middleware/authMiddleware");

// Add Income
router.post("/", protect, addIncome);

// Get All Income of Logged In User
router.get("/", protect, getIncome);

// Delete Income
router.delete("/:id", protect, deleteIncome);

module.exports = router;