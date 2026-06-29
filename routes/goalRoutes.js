const express = require("express");
const router = express.Router();

const {
    getGoals,
    addGoal,
    updateGoal,
    deleteGoal,
} = require("../controllers/goalController");

const protect = require("../middleware/authMiddleware");

// ==============================
// GET All Goals
// ==============================
router.get("/", protect, getGoals);

// ==============================
// ADD Goal
// ==============================
router.post("/", protect, addGoal);

// ==============================
// UPDATE Goal
// ==============================
router.put("/:id", protect, updateGoal);

// ==============================
// DELETE Goal
// ==============================
router.delete("/:id", protect, deleteGoal);

module.exports = router;