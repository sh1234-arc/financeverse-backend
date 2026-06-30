const Transaction = require("../models/Transaction");

// =====================================================
// GET ALL TRANSACTIONS
// =====================================================
const getTransactions = async(req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        // IMPORTANT: return array directly
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Get Transactions Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// =====================================================
// ADD TRANSACTION
// =====================================================
const addTransaction = async(req, res) => {
    try {
        const { title, category, amount, type } = req.body;

        // validation
        if (!title || !category || !amount || !type) {
            return res.status(400).json({
                message: "Please fill all fields",
            });
        }

        // create transaction
        const transaction = await Transaction.create({
            user: req.user.id,
            title,
            category,
            amount,
            type,
        });

        // IMPORTANT: return raw object (frontend friendly)
        res.status(201).json(transaction);

    } catch (error) {
        console.error("Add Transaction Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// =====================================================
// DELETE TRANSACTION
// =====================================================
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

        await Transaction.deleteOne({
            _id: req.params.id,
            user: req.user.id,
        });

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

// =====================================================
// UPDATE TRANSACTION
// =====================================================
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

        const updatedTransaction = await Transaction.findOneAndUpdate({
                _id: req.params.id,
                user: req.user.id,
            },
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