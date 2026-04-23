const Project = require('../models/Project');

/* GET /api/projects — fetch all projects */
exports.getProjects = async (_req, res) => {
  try {
    const projects = await Project.find().sort('-featured createdAt');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
