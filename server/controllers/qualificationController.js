const Qualification = require("../models/Qualification");

/* GET /api/qualifications — fetch all qualifications */
exports.getQualifications = async (_req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
