const mongoose = require('mongoose');
require('dotenv').config();
const DB_HOST = process.env.DB_HOST;
const DB_PASS = process.env.DB_PASS;
const DB_USERNAME = process.env.DB_USERNAME;

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://DB_USERNAME:DB_PASS@DB_HOST:27017/CWA?authSource=admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
