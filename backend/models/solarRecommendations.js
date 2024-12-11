const mongoose = require('mongoose');

const solarReportSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  location: {
      type: String,
      required: true
  },
  houseSize: {
      type: Number,
      min: 0,
      required: true
  },
  energyConsumption: {
      type: Number,
      min: 0,
      required: true
  },
  recommendedPanels: [
      {
        panelType: {
            type: String,
            enum: ['Monocrystalline', 'Polycrystalline', 'Thin Film'], 
            required: true
        },
        size: {
            type: String, // or Number if size is in Watts
            required: true
        },
        quantity: {
            type: Number,
            min: 1,
            required: true
        }
      }
  ],
  estimatedCost: {
      type: Number,
      min: 0,
      required: true
  },
  roi: {
      monthlySavings: {
          type: Number,
          min: 0,
          required: true
      },
      yearlySavings: {
          type: Number,
          min: 0,
          required: true
      }
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('SolarReport', solarReportSchema);
