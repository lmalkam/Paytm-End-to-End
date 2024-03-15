require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_KEY);
const z = require('zod');

const PasswordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters long' })
  .max(10, { message: 'Password must be at most 10 characters long' });

module.exports = PasswordSchema;