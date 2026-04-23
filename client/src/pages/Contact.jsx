import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <motion.div
      className="page page--contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section__title">Get In Touch</h1>
          <p className="section__subtitle">Let&apos;s build something together</p>
        </motion.div>

        <div className="contact__content">
          {/* Contact Info Sidebar */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact__info-title">Contact Information</h3>
            <p className="contact__info-text">
              Feel free to reach out for collaborations, projects, or just a
              friendly conversation about technology.
            </p>

            <div className="contact__info-items">
              <div className="contact__info-item">
                <FaEnvelope className="contact__info-icon" />
                <div>
                  <span className="contact__info-label">Email</span>
                  <span className="contact__info-value">uppala.mahesh@email.com</span>
                </div>
              </div>
              <div className="contact__info-item">
                <FaPhone className="contact__info-icon" />
                <div>
                  <span className="contact__info-label">Phone</span>
                  <span className="contact__info-value">+91 XXXXXXXXXX</span>
                </div>
              </div>
              <div className="contact__info-item">
                <FaMapMarkerAlt className="contact__info-icon" />
                <div>
                  <span className="contact__info-label">Location</span>
                  <span className="contact__info-value">India</span>
                </div>
              </div>
            </div>

            <div className="contact__social">
              <a
                href="https://github.com/Uppala-mahesh"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/uppala-mahesh"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
