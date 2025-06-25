const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    fileName: { type: String, default: null },
  },
  { timestamps: true } // this enables createdAt & updatedAt
);

module.exports = mongoose.model('Feedback', feedbackSchema);
