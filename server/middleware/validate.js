/**
 * Validate contact form submission fields.
 * Rules:
 *   – name, email, mobile, message → all required, no empty strings
 *   – email                        → must match standard format
 *   – mobile                       → must be exactly 10 digits
 */
const validateContact = (req, res, next) => {
  const { name, email, mobile, message } = req.body;
  const errors = [];

  /* ── Required fields ── */
  if (!name || name.trim() === "") errors.push("Name is required");
  if (!message || message.trim() === "") errors.push("Message is required");

  /* ── Email validation ── */
  if (!email || email.trim() === "") {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address");
  }

  /* ── Mobile validation (exactly 10 digits) ── */
  if (!mobile || mobile.trim() === "") {
    errors.push("Mobile number is required");
  } else if (!/^\d{10}$/.test(mobile.trim())) {
    errors.push("Mobile number must be exactly 10 digits");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { validateContact };
