// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require("./config/dbConnection");
const authRoutes = require('./routes/auth');
const dotenv = require("dotenv").config();

connectDB();

const app = express();




const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", require("./routes/userRouts"));

// Use routes
app.use('/routes/auth', authRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
