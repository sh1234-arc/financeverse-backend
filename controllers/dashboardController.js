const Income = require("../models/Income");
const Expense = require("../models/Expense");

const getDashboardData = async(req, res) => {
    try {
        const userId = req.user._id;

        // Fetch Income
        const incomes = await Income.find({ user: userId });

        const totalIncome = incomes.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        // Fetch Expenses
        const expenses = await Expense.find({ user: userId });

        const totalExpense = expenses.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        // Balance
        const balance = totalIncome - totalExpense;

        res.status(200).json({
            totalIncome,
            totalExpense,
            balance,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getDashboardData,
};