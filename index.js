const http = require('http');
const data = require('./data');
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretkey = "secretkey";
const authRoutes = require('./routes/auth');
http.createServer((req,resp)=>{
    console.log('hi');
    resp.writeHead(200,{'Content-Type':'application\json'});
    resp.write(JSON.stringify(data));
    resp.end();
}).listen(5500);

app.use('/auth', authRoutes);


    jwt.sign({user},secretkey,{expiresIn:'300s'},(err,token)=>{
        resp.json({
            token
        })
    })


