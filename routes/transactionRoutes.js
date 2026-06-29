const express = require("express");
const router = express.Router();

const {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
} = require("../controllers/transactionController");

const protect = require("../middleware/authMiddleware");

// ==============================
// GET All Transactions
// ==============================
router.get("/", protect, getTransactions);

// ==============================
// ADD Transaction
// ==============================
router.post("/", protect, addTransaction);

// ==============================
// UPDATE Transaction
// ==============================
router.put("/:id", protect, updateTransaction);

// ==============================
// DELETE Transaction
// ==============================
router.delete("/:id", protect, deleteTransaction);

module.exports = router;