const Expense = require("../models/Expense");

// CREATE EXPENSE
const addExpense = async(req, res) => {
    try {
        const { title, amount, category } = req.body;

        const expense = await Expense.create({
            title,
            amount,
            category,
            user: req.user._id,
        });

        res.status(201).json({
            message: "Expense added successfully",
            expense,
        });
    } catch (error) {
        console.log("ADD EXPENSE ERROR:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// GET ALL EXPENSES
const getExpenses = async(req, res) => {
    try {
        const expenses = await Expense.find({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        res.status(200).json(expenses);
    } catch (error) {
        console.log("GET EXPENSE ERROR:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// UPDATE EXPENSE
const updateExpense = async(req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        res.status(200).json({
            message: "Expense updated successfully",
            expense,
        });
    } catch (error) {
        console.log("UPDATE EXPENSE ERROR:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// DELETE EXPENSE
const deleteExpense = async(req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Expense deleted successfully",
        });
    } catch (error) {
        console.log("DELETE EXPENSE ERROR:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
};