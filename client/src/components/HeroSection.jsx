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
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="hero__greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Hello, I&apos;m
          </motion.p>
          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Uppala Mahesh
          </motion.h1>
          <motion.div
            className="hero__role-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <span className="hero__role">{text}</span>
            <span className="hero__cursor">|</span>
          </motion.div>
          <motion.p
            className="hero__tagline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Designing scalable systems, building intelligent applications, and
            exploring the intersection of software, data, and innovation.
          </motion.p>
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link to="/skills" className="hero__btn hero__btn--primary">
              View My Work
            </Link>
            <Link to="/contact" className="hero__btn hero__btn--secondary">
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span>Scroll Down</span>
          <HiArrowDown className="hero__scroll-icon" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
