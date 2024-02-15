const User = require("../models/user");

const getAllUsers = async (req, res) => {
    const myData = await User.find().sort({UserId : 1});
    res.status(200).json({ myData });
};

const getAllUsersTesting = async (req, res) => {
    const myData = await User.find();  
    res.status(200).json({ myData })
};

const getUserByID = async (req, res) => {
   const userData = await User.findOne({UserId : req.params.id});
    res.status(200).json({ userData })
};

const getUserNameByID = async (userId) => {
    const userData = await User.findOne({UserId : userId});
     return userData
}
module.exports = {getAllUsers, getAllUsersTesting, getUserByID, getUserNameByID}