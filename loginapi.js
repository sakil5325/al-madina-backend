// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/user');

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://dbAlMadinaSoc:pshqei1DrZw95fpp@serverlessinstance0.d9pt7.mongodb.net/almadinasoc?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route to register a new user
app.post('/register', async (req, res) => {
  try {
    const { UserName, Password,  } = req.body;
    const user = new User({ UserName, Password, });
    await user.save();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to generate a token upon login
app.post('/login', async (req, res) => {
  try {
    const { UserName, Password } = req.body;

    if (!UserName || !Password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Find user by username
    const user = await User.findOne({ UserName });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Compare passwords
    const validPassword = bcrypt.compare(Password, user.Password, user.hash, user.salt);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ UserName: user.UserName }, 'your-secret-key');
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error during login.' });
  }
});


// Protected route that requires authentication
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route!', user: req.user });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Error starting the server:', err);
});
