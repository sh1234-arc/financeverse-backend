const Income = require("../models/Income");

// ADD INCOME
const addIncome = async(req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("USER:", req.user);

        const income = await Income.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json(income);
    } catch (error) {
        console.log("ADD INCOME ERROR:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};

// GET INCOME
const getIncome = async(req, res) => {
    try {
        const income = await Income.find({
            user: req.user._id,
        }).sort({ createdAt: -1 });

        res.json(income);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// DELETE INCOME
const deleteIncome = async(req, res) => {
    try {
        const income = await Income.findById(req.params.id);

        if (!income) {
            return res.status(404).json({
                message: "Income not found",
            });
        }

        if (
            income.user.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                message: "Not authorized",
            });
        }

        await income.deleteOne();

        res.json({
            message: "Income deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    addIncome,
    getIncome,
    deleteIncome,
};