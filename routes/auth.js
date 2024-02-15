// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../db/config');
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
  try {
    const { name, UserName, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ UserName });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    user = new User({ name, UserName, password });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { UserName, password } = req.body;

    // Find the user by UserName
    const user = await User.findOne({ UserName });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate and sign a JWT token
    const payload = { id: user.id, name: user.name };
    const token = jwt.sign(payload, config.secretOrKey, { expiresIn: 3600 });

    res.json({
      success: true,
      token: 'Bearer ' + token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
