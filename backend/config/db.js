const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection error: ', err.message);
    }
};

module.exports = connectDB;
