const Skill = require("../models/Skill");

/* GET /api/skills — fetch all skills sorted by category */
exports.getSkills = async (_req, res) => {
  try {
    const skills = await Skill.find().sort("category name");
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
