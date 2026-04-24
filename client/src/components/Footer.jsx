import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { HiArrowUp } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <motion.div
          className="footer__brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="footer__logo">
            UM<span>.</span>
          </h3>
          <p className="footer__tagline">Building the future, one line at a time.</p>
        </motion.div>

        <motion.div
          className="footer__social"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <a
            href="https://github.com/Uppala-mahesh"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/uppala-mahesh"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:uppala.mahesh@email.com"
            className="footer__social-link"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </motion.div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Uppala Mahesh. All rights reserved.</p>
          <button
            className="footer__top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <HiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
