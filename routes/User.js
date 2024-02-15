// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

// Hash the user's password before saving it to the database
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next(); // If the password is not modified, move to the next middleware
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
