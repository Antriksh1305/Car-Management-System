const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    images: [String],
});

module.exports = mongoose.model('Car', carSchema);
