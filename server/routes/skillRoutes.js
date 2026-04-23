const router = require('express').Router();
const { getSkills } = require('../controllers/skillController');

router.get('/', getSkills);

module.exports = router;
