const express = require("express");
const router = express.Router();

console.log("EXPENSE ROUTES LOADED");

const authMiddleware = require("../middleware/authMiddleware");

const {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
} = require("../controllers/expenseController");

// Add Expense
router.post(
    "/add",
    authMiddleware,
    addExpense
);

// Get All Expenses
router.get(
    "/",
    authMiddleware,
    getExpenses
);

// Update Expense
router.put(
    "/:id",
    authMiddleware,
    updateExpense
);

// Delete Expense
router.delete(
    "/:id",
    authMiddleware,
    deleteExpense
);

// Test Route
router.get(
    "/test",
    (req, res) => {
        res.json({
            message: "Expense Route Working",
        });
    }
);

module.exports = router;