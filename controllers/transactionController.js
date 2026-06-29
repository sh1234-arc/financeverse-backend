const Transaction = require("../models/Transaction");

// ==============================
// Get All Transactions
// ==============================
const getTransactions = async(req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Get Transactions Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ==============================
// Add Transaction
// ==============================
const addTransaction = async(req, res) => {
    try {
        const { title, category, amount, type } = req.body;

        if (!title || !category || !amount || !type) {
            return res.status(400).json({
                message: "Please fill all fields",
            });
        }

        const transaction = await Transaction.create({
            user: req.user.id,
            title,
            category,
            amount,
            type,
        });

        res.status(201).json({
            message: "Transaction Added Successfully",
            transaction,
        });

    } catch (error) {
        console.error("Add Transaction Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ==============================
// Delete Transaction
// ==============================
const deleteTransaction = async(req, res) => {
    try {

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction Not Found",
            });
        }

        await Transaction.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Transaction Deleted Successfully",
        });

    } catch (error) {
        console.error("Delete Transaction Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ==============================
// Update Transaction
// ==============================
const updateTransaction = async(req, res) => {
    try {

        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction Not Found",
            });
        }

        const updatedTransaction =
            await Transaction.findByIdAndUpdate(
                req.params.id,
                req.body, {
                    new: true,
                    runValidators: true,
                }
            );

        res.status(200).json(updatedTransaction);

    } catch (error) {
        console.error("Update Transaction Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
};