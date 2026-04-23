import { useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return 'Please enter a valid email address';
    if (!formData.mobile.trim()) return 'Mobile number is required';
    if (!/^\d{10}$/.test(formData.mobile.trim()))
      return 'Mobile number must be exactly 10 digits';
    if (!formData.message.trim()) return 'Message is required';
    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/contact', formData);
      setStatus({
        type: 'success',
        message: "Message sent successfully! I'll get back to you soon."
      });
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (err) {
      const msg =
        err.response?.data?.errors?.join(', ') ||
        'Something went wrong. Please try again.';
      setStatus({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      className="contact-form"
      id="contact-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="contact-form__group">
        <label htmlFor="contact-name">Full Name</label>
        <input
          type="text"
          id="contact-name"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form__group">
        <label htmlFor="contact-email">Email Address</label>
        <input
          type="email"
          id="contact-email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form__group">
        <label htmlFor="contact-mobile">Mobile Number</label>
        <input
          type="tel"
          id="contact-mobile"
          name="mobile"
          placeholder="Enter 10-digit mobile number"
          value={formData.mobile}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form__group">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Write your message here..."
          rows="5"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      {status.message && (
        <div className={`contact-form__status contact-form__status--${status.type}`}>
          {status.message}
        </div>
      )}

      <button
        type="submit"
        className="contact-form__submit"
        id="contact-submit"
        disabled={loading}
      >
        {loading ? (
          <span className="contact-form__loading">
            <span className="contact-form__spinner" />
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>
    </motion.form>
  );
};

export default ContactForm;
