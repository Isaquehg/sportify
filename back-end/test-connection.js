// test-connection.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
console.log(`Connecting to: ${uri}`);

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB!');
    mongoose.connection.close();
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));
