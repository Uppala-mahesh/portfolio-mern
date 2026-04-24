import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import HeroSection from '../components/HeroSection';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/api/projects');
        setProjects(data.filter((p) => p.featured));
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const stats = [
    { value: '5+', label: 'Projects Built' },
    { value: '16+', label: 'Skills Acquired' },
    { value: '4+', label: 'Certifications' },
    { value: '2+', label: 'Years Learning' }
  ];

  return (
    <motion.div
      className="page page--home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />

      {/* Featured Projects */}
      <section className="section featured-projects" id="featured-projects">
        <div className="container">
          <motion.div
            className="section__header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section__title">Featured Projects</h2>
            <p className="section__subtitle">Some of my recent work</p>
          </motion.div>

          {loading ? (
            <Loader />
          ) : (
            <div className="projects-grid">
              {projects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="section stats-section" id="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="stat-card__value">{stat.value}</span>
                <span className="stat-card__label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
