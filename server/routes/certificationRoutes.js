const router = require("express").Router();
const { getCertifications } = require("../controllers/certificationController");

router.get("/", getCertifications);

module.exports = router;
