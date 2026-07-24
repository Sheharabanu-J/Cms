const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load env vars
dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    const adminExists = await User.findOne({ email: 'admin@renewcred.com' });

    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    await User.create({
      name: 'Admin User',
      email: 'admin@renewcred.com',
      password: 'password123',
      role: 'admin'
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@renewcred.com');
    console.log('Password: password123');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
