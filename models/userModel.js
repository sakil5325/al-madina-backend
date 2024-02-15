const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

    UserId: {
        type: String,
        required: [true, "FirstName must be provided"]
    },
    SurName:{
        type: String,
        required: [true, "Surname must be provided"]
    },
    FirstName: {
        type: String,
        required: [true, "FirstName must be provided"],
    },
    LastName: {
        type: String,
        required: [true, "LastName must be provided"],
    },
    MobileNumber: {
        type: String,
        required: [true, "MobileNumber must be provided"],
    },
    IsAdmin: {
        type: Boolean,
    },
    UserName: {
        type: String,
        required: [true, "FirstName must be provided"]
    },
    email: {
        type: String,
        required: [true, "LastName must be provided"],
        unique: [true, "Email address allready teken"]
    },
    Password: {
        type: String,
        required: [true, "MobileNumber must be provided"]
    },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model('User', userSchema);