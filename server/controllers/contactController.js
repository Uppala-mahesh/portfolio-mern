const Message = require('../models/Message');

/* POST /api/contact — save a new contact message */
exports.submitMessage = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;
    const newMessage = new Message({ name, email, mobile, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET /api/contact — retrieve all messages (admin) */
exports.getMessages = async (_req, res) => {
  try {
    const messages = await Message.find().sort('-createdAt');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
