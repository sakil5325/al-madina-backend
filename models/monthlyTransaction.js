const mongoose = require('mongoose');

const monthlyTransactionsSchema = new mongoose.Schema({
    UserId: {
        type: Number,
        required: [true, "user id must be provided"]
    },
    PaidAmount: {
        type: Number,
        required: [true, "PaidAmount must be provided"]
    },
    PaymentMode: {
        type: Number,
        required: [true, "PaymentMode must be provided"]
    },
    PaymentReceivedBy: {
        type: Number,
        required: [true, "PaymentReceivedBy must be provided"]
    },
    DateOfPayment: {
        type: Date,
        default : Date.now(),
    },
    DateOfMonthlyPay: {
        type: Date,
        default : Date.now(),
    },
    createdAt: {
        type: Date,
        default : Date.now(),
    },
    updatedAt: {
        type: Date,
        default : Date.now(),
    },
})

module.exports = mongoose.model('MonthlyTransaction', monthlyTransactionsSchema);