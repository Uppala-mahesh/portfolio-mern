const router = require('express').Router();
const { getQualifications } = require('../controllers/qualificationController');

router.get('/', getQualifications);

module.exports = router;
