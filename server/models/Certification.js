const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    title:         { type: String, required: true },
    issuer:        { type: String, required: true },
    date:          { type: String },
    credentialUrl: { type: String },
    image:         { type: String },
    description:   { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Certification', certificationSchema);
