const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/renewcred';
    let conn;
    
    try {
      conn = await mongoose.connect(mongoUri);
    } catch (err) {
      if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        console.log('Failed to connect to primary MongoDB, starting in-memory database...');
        const mongoServer = await MongoMemoryServer.create();
        mongoUri = mongoServer.getUri();
        conn = await mongoose.connect(mongoUri);
        console.log('Started mongodb-memory-server successfully.');
      } else {
        throw err;
      }
    }
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Always ensure an admin user exists, even in production on first launch
    const adminExists = await User.findOne({ email: 'admin@renewcred.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@renewcred.com',
        password: 'password123',
        role: 'admin'
      });
      console.log('Admin user seeded in database.');
    }
    
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.warn('Backend is running without a database connection.');
  }
};

module.exports = connectDB;
