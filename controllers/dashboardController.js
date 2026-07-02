const Income = require("../models/Income");
const Expense = require("../models/Expense");
const Transaction = require("../models/Transaction");
const Budget = require("../models/Budget");
const Goal = require("../models/Goal");

// =====================================
// GET DASHBOARD DATA
// =====================================
const getDashboardData = async(req, res) => {
    try {
        const userId = req.user._id;

        // ==========================
        // INCOME
        // ==========================
        const incomes = await Income.find({ user: userId });

        const totalIncome = incomes.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        // ==========================
        // EXPENSE
        // ==========================
        const expenses = await Expense.find({ user: userId });

        const totalExpense = expenses.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        // ==========================
        // BALANCE
        // ==========================
        const balance = totalIncome - totalExpense;

        // ==========================
        // RECENT TRANSACTIONS
        // ==========================
        const transactions = await Transaction.find({
                user: userId,
            })
            .sort({ createdAt: -1 })
            .limit(5);

        // ==========================
        // BUDGET
        // ==========================
        const budgets = await Budget.find({
            user: userId,
        });

        const totalBudget = budgets.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        const spent = totalExpense;
        const remaining = totalBudget - spent;

        const used =
            totalBudget > 0 ?
            Math.round((spent / totalBudget) * 100) :
            0;

        // ==========================
        // GOAL
        // ==========================
        const goalData = await Goal.findOne({
            user: userId,
        });

        let goal = {
            name: "",
            target: 0,
            saved: 0,
            remaining: 0,
            progress: 0,
        };

        if (goalData) {
            goal = {
                name: goalData.name,
                target: goalData.target,
                saved: goalData.saved,
                remaining: goalData.target - goalData.saved,
                progress: goalData.target > 0 ?
                    Math.round(
                        (goalData.saved / goalData.target) * 100
                    ) :
                    0,
            };
        }

        // ==========================
        // CHART
        // ==========================
        const incomeExpenseData = [{
            name: "Finance",
            Income: totalIncome,
            Expense: totalExpense,
        }, ];

        // ==========================
        // RESPONSE
        // ==========================
        res.status(200).json({
            totalIncome,
            totalExpense,
            balance,

            incomeExpenseData,

            transactions,

            budget: {
                total: totalBudget,
                spent,
                remaining,
                used,
            },

            goal,
        });

    } catch (error) {
        console.error("Dashboard Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    getDashboardData,
};