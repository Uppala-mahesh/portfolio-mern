const mongoose = require('mongoose');

const qualificationSchema = new mongoose.Schema(
  {
    degree:      { type: String, required: true },
    institution: { type: String, required: true },
    year:        { type: String, required: true },
    percentage:  { type: String },
    status:      { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Qualification', qualificationSchema);
