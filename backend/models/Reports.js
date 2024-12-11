const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
  },
  reportType: {
      type: String,
      //enum: ['Energy Savings', 'Water Conservation', 'Waste Reduction'], // Example enum
      required: true
  },
  data: {
      installationCost: {
          type: Number,
          min: 0,
          required: true
      },
      monthlySavings: {
          type: Number,
          min: 0,
          required: true
      },
      yearlySavings: {
          type: Number,
          min: 0,
          required: true
      },
      roi: {
          yearsToBreakEven: {
              type: Number,
              min: 0
          },
          totalSavingsAfter10Years: {
              type: Number,
              min: 0
          }
      },
      carbonFootprintReduction: {
        type: String,
        required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);
