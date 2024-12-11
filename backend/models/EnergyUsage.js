const mongoose = require('mongoose');

const usageReportSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
  },
  monthlyUsage: [
        {
          month: {
                type: String,
                enum: [
                      'January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'
                ],
                required: true
          },
          usage: {
                type: Number,
                min: 0,
                required: true
          }
        }
  ],
  yearlyUsage: [
        {
          year: {
                type: Number,
                required: true
          },
          usage: {
                type: Number,
                min: 0,
                required: true
          }
        }
  ],
  updatedAt: {
        type: Date,
        default: Date.now
  }
});

module.exports = mongoose.model('UsageReport', usageReportSchema);
