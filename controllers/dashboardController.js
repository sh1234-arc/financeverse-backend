const Income = require("../models/income");
const Expense = require("../models/expense");

const getDashboardData = async(req, res) => {
    try {
        const userId = req.user._id;

        // Income
        const incomes = await Income.find({ user: userId });

        const totalIncome = incomes.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        // Expense
        const expenses = await Expense.find({ userId });

        const totalExpense = expenses.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        const balance = totalIncome - totalExpense;

        res.json({
            totalIncome,
            totalExpense,
            balance,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { getDashboardData };