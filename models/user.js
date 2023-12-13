const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserId: {
        type: Number,
        required: [true, "user id must be provided"]
    },
    SurName: {
        type: String,
        required: [true, "SurName must be provided"]
    },
    FirstName: {
        type: String,
        required: [true, "FirstName must be provided"]
    },
    LastName: {
        type: String,
        required: [true, "LastName must be provided"]
    },
    MobileNumber: {
        type: Number,
        required: [true, "MobileNumber must be provided"]
    },
    Password: {
        type: String,
        required: [true, "Password must be provided"]
    },
    IsAdmin: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model('User', userSchema);