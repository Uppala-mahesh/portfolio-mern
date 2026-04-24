const Certification = require("../models/Certification");

/* GET /api/certifications — fetch all certifications */
exports.getCertifications = async (_req, res) => {
  try {
    const certs = await Certification.find().sort("-date");
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
