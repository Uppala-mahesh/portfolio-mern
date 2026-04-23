import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/',               label: 'Home' },
  { path: '/about',          label: 'About' },
  { path: '/qualifications', label: 'Qualifications' },
  { path: '/skills',         label: 'Skills' },
  { path: '/certifications', label: 'Certifications' },
  { path: '/contact',        label: 'Contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar" id="main-nav">
      <div className="navbar__container">
        {/* Logo */}
        <NavLink to="/" className="navbar__logo" onClick={() => setIsOpen(false)}>
          <span className="navbar__logo-text">UM</span>
          <span className="navbar__logo-dot">.</span>
        </NavLink>

        {/* Desktop Links */}
        <div className="navbar__links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger Toggle */}
        <button
          className="navbar__toggle"
          id="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
