const Expense = require("../models/expense");

// CREATE
const addExpense = async(req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("USER:", req.user);

        const { title, amount, category } = req.body;

        const expense = await Expense.create({
            title,
            amount,
            category,
            userId: req.user.id,
        });

        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ
const getExpenses = async(req, res) => {
    try {
        const expenses = await Expense.find({
            userId: req.user.id,
        });

        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
const updateExpense = async(req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
const deleteExpense = async(req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);

        res.json({
            message: "Expense deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
};