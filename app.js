require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const connectDB = require("./db/connect")

const users_routes = require("./routes/users")
const monthly_transactions_routes = require("./routes/monthly-transactions")

const allowedOrigins = ['http://localhost:8080'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Hi, I am live now!")
});

// middleware or set routes
app.use("/api/users", users_routes)
app.use("/api/monthly-transactions", monthly_transactions_routes)

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => {
           console.log(`${PORT} Yes I am connected`);
        });
    } catch (error) {
        console.log(error)
    }
}

start();