const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((res) => {

    console.log(res.connection.host, 
      res.connection.name);
  }).catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
};

module.exports = connectDB;