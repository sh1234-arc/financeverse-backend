const Income = require("../models/Income");
const Expense = require("../models/Expense");

const getLoanEligibility = async(req, res) => {
    try {
        // Fetch user's income
        const incomes = await Income.find({
            user: req.user.id,
        });

        // Fetch user's expenses
        const expenses = await Expense.find({
            user: req.user.id,
        });

        // Total Income
        const totalIncome = incomes.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        // Total Expense
        const totalExpense = expenses.reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );

        // Savings (20% of income)
        const monthlySavings = totalIncome * 0.2;

        // Disposable Income
        const disposableIncome =
            totalIncome - totalExpense - monthlySavings;

        // Max EMI (40% of income)
        const maxEmi = totalIncome * 0.4;

        // Loan Eligibility
        const eligibleHomeLoan = maxEmi * 240;

        const eligibleCarLoan = maxEmi * 60;

        const eligibleEducationLoan = maxEmi * 120;

        const loanScore =
            totalIncome > 0 ?
            Math.round(
                (disposableIncome / totalIncome) * 100
            ) :
            0;

        res.status(200).json({
            monthlyIncome: totalIncome,
            monthlyExpense: totalExpense,
            monthlySavings,
            disposableIncome,
            maxEmi,
            eligibleHomeLoan,
            eligibleCarLoan,
            eligibleEducationLoan,
            loanScore,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    getLoanEligibility,
};