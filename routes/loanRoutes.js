const express = require("express");

const router = express.Router();

const {
    getLoanEligibility,
} = require("../controllers/loanController");

const protect = require("../middleware/authMiddleware");

// Get Loan Eligibility
router.get("/", protect, getLoanEligibility);

module.exports = router;