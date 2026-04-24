import { useState, useRef } from "react";
import api from "../api";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Magnetic button effect
  const btnRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const validate = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Please enter a valid email address";
    if (!formData.mobile.trim()) return "Mobile number is required";
    if (!/^\d{10}$/.test(formData.mobile.trim()))
      return "Mobile number must be exactly 10 digits";
    if (!formData.message.trim()) return "Message is required";
    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.message) setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/contact", formData);
      setStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch (err) {
      const msg =
        err.response?.data?.errors?.join(", ") ||
        "Something went wrong. Please try again.";
      setStatus({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-accentBlue focus:ring-1 focus:ring-accentBlue/50 transition-all";

  return (
    <motion.form
      className="glass-card p-8 rounded-2xl bg-slate-900/40 border-white/10"
      id="contact-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="contact-mobile"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Mobile Number
        </label>
        <input
          type="tel"
          id="contact-mobile"
          name="mobile"
          placeholder="Enter 10-digit mobile number"
          value={formData.mobile}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Write your message here..."
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} resize-y min-h-[120px]`}
        />
      </div>

      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`px-4 py-3 rounded-lg mb-6 text-sm font-medium border ${
            status.type === "success"
              ? "bg-green-500/10 text-green-400 border-green-500/20"
              : "bg-red-500/10 text-red-400 border-red-500/20"
          }`}
        >
          {status.message}
        </motion.div>
      )}

      {/* Magnetic Button Container */}
      <div
        className="relative inline-block w-full sm:w-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.button
          ref={btnRef}
          type="submit"
          className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-accentBlue to-accentPurple text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_30px_rgba(59,130,246,0.5)] transition-shadow duration-300"
          id="contact-submit"
          disabled={loading}
          style={{ x: mouseXSpring, y: mouseYSpring }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending Signal...
            </span>
          ) : (
            "Send Message"
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
