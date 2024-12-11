const mongoose = require('mongoose');

const EnergyUsageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    monthlyUsage: [{ month: String, usage: Number }],
    yearlyUsage: [{ year: Number, usage: Number }],
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EnergyUsage', EnergyUsageSchema);
