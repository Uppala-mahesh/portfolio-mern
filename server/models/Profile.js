const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String },
    summary: { type: String },
    image: { type: String },
    location: { type: String },
    email: { type: String },
    phone: { type: String },
    linkedin: { type: String },
    github: { type: String },
    resume: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Profile", profileSchema);
