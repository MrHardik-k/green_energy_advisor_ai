const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
