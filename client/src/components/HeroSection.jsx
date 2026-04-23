import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import ParticleBackground from './ParticleBackground';

const roles = [
  'Full Stack Developer',
  'IT Engineering Student',
  'Aspiring Tech Entrepreneur',
  'Problem Solver'
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => setText(current.substring(0, isDeleting ? text.length - 1 : text.length + 1)),
        isDeleting ? 40 : 90
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="hero" id="hero">
      <ParticleBackground />
      <div className="hero__content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="hero__greeting">Hello, I&apos;m</p>
          <h1 className="hero__name">Uppala Mahesh</h1>
          <div className="hero__role-wrapper">
            <span className="hero__role">{text}</span>
            <span className="hero__cursor">|</span>
          </div>
          <p className="hero__tagline">
            Designing scalable systems, building intelligent applications, and
            exploring the intersection of software, data, and innovation.
          </p>
          <div className="hero__cta">
            <Link to="/skills" className="hero__btn hero__btn--primary">
              View My Work
            </Link>
            <Link to="/contact" className="hero__btn hero__btn--secondary">
              Get In Touch
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span>Scroll Down</span>
          <HiArrowDown className="hero__scroll-icon" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
