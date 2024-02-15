const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const registerUser = asyncHandler(async(req,res)=>{
    const {UserName,email,Password,UserId,SurName,FirstName,LastName,MobileNumber,IsAdmin} = req.body;
    if(!UserName || !email|| !Password || !UserId || !SurName || !FirstName || !LastName|| !MobileNumber || !IsAdmin){
        res.status(400);
        throw new Error("All fileds are mandatory!");
    }

    const userAvailabel = await User.findOne({ email });
    if(userAvailabel){
        res.status(400);
        throw new Error("User already registred!");
    }  
    const hashedPassword = await bcrypt.hash(Password, 10);
    console.log("Hashed Password:", hashedPassword);
    
    const user = await User.create({
        UserName,
        email,
        Password:hashedPassword,
        UserId,
        SurName,
        FirstName,
        LastName,
        MobileNumber,
        IsAdmin,
    


    });

    console.log('User created ${user}');

    if(user){
        res.status(201).json({_id:user.id, email:user.email});
    }
    else{
        res.status(400);
        throw new Error("User data us not valid");
    }
    res.json({massage: "Register the user"});
});

const loginUser = asyncHandler(async(req,res)=>{

    const {email,Password}=req.body;
    if(!email || !Password){
        res.status(400);
        throw new Error("All fileds are manadatory!");
    }

    const user = await User.findOne({email});
    //campare password with hashedpassword
    if(user && (await bcrypt.compare(Password, user.Password)))
    {
        const accessToken = jwt.sign({
            user:{
                UserName:user.UserName,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn:"5m" }
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    res.json({massage: "login user"});
});

module.exports = {registerUser, loginUser};