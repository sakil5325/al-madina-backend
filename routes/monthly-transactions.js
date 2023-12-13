const express = require("express");
const router = express.Router();

const {
    getAllMonthlyTransactions,
    getAllMonthlyTransactionsTesting,
    getDashboardStats,
} = require("../controllers/monthlyTransactionsCtrl");

router.route("/").get(getAllMonthlyTransactions);
router.route("/testing").get(getAllMonthlyTransactionsTesting);
router.route("/stats").get(getDashboardStats);

module.exports = router;