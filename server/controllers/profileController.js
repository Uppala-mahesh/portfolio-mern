const Profile = require("../models/Profile");

/* GET /api/profile — fetch the single portfolio profile */
exports.getProfile = async (_req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
