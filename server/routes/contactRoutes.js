const router = require("express").Router();
const { validateContact } = require("../middleware/validate");
const {
  submitMessage,
  getMessages,
} = require("../controllers/contactController");

router.post("/", validateContact, submitMessage);
router.get("/", getMessages);

module.exports = router;
