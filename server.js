const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const ExpenseRoutes = require("./routes/ExpenseRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const goalRoutes = require("./routes/goalRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const LoanRoutes = require("./routes/loanRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("FinanceVerse Backend Running");
});

// AUTH ROUTES
app.use("/api/auth", authRoutes);

// EXPENSE ROUTES
app.use("/api/expenses", expenseRoutes);

// INCOME ROUTES
app.use("/api/income", incomeRoutes);

// TRANSACTION ROUTES
app.use("/api/transactions", transactionRoutes);

//GOAL ROUTES
app.use("/api/goals", goalRoutes);

//BUDGET ROUTES
app.use("/api/budgets", budgetRoutes);

//DASHBOARD ROUTES
app.use("/api/dashboard", dashboardRoutes);

//LOAN ROUTES
app.use("/api/loans", loanRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});