import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaGraduationCap } from 'react-icons/fa';
import Loader from '../components/Loader';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/api/profile');
        setProfile(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <Loader />
      </div>
    );
  }

  if (!profile) {
    return <div className="page-error">Profile not found. Please seed the database.</div>;
  }

  return (
    <motion.div
      className="page page--about"
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
          <h1 className="section__title">About Me</h1>
          <p className="section__subtitle">Get to know who I am</p>
        </motion.div>

        <div className="about__content">
          {/* Avatar */}
          <motion.div
            className="about__image-wrapper"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="about__image">
              <div className="about__avatar">
                <span>UM</span>
              </div>
            </div>
          </motion.div>

          {/* Info Card */}
          <motion.div
            className="about__info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="about__name">{profile.name}</h2>
            <p className="about__title">{profile.title}</p>

            <div className="about__bio">
              {profile.summary?.split('\n').map((paragraph, i) =>
                paragraph.trim() ? <p key={i}>{paragraph}</p> : null
              )}
            </div>

            <div className="about__details">
              <div className="about__detail">
                <FaMapMarkerAlt />
                <span>{profile.location}</span>
              </div>
              <div className="about__detail">
                <FaEnvelope />
                <span>{profile.email}</span>
              </div>
              <div className="about__detail">
                <FaGraduationCap />
                <span>B.Tech IT — Vasavi College of Engineering</span>
              </div>
              {profile.github && (
                <div className="about__detail">
                  <FaGithub />
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    GitHub Profile
                  </a>
                </div>
              )}
              {profile.linkedin && (
                <div className="about__detail">
                  <FaLinkedin />
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
