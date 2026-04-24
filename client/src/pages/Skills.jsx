import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import SkillBar from '../components/SkillBar';
import Loader from '../components/Loader';
import {
  SiJavascript, SiReact, SiHtml5, SiNodedotjs, SiExpress,
  SiMongodb, SiPython, SiLinux, SiGit
} from 'react-icons/si';
import {
  TbApi, TbBinaryTree, TbDatabase, TbNetwork, TbPuzzle
} from 'react-icons/tb';
import { MdDevices } from 'react-icons/md';
import { FaCubes } from 'react-icons/fa';

/* Map icon strings from DB to actual React components */
const iconMap = {
  SiJavascript:  <SiJavascript />,
  SiReact:       <SiReact />,
  SiHtml5:       <SiHtml5 />,
  MdDevices:     <MdDevices />,
  SiNodedotjs:   <SiNodedotjs />,
  SiExpress:     <SiExpress />,
  SiMongodb:     <SiMongodb />,
  TbApi:         <TbApi />,
  SiPython:      <SiPython />,
  TbBinaryTree:  <TbBinaryTree />,
  TbBoxModel:    <FaCubes />,
  TbDatabase:    <TbDatabase />,
  SiLinux:       <SiLinux />,
  TbNetwork:     <TbNetwork />,
  SiGit:         <SiGit />,
  TbPuzzle:      <TbPuzzle />
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await api.get('/api/skills');
        setSkills(data);
      } catch (err) {
        console.error('Failed to fetch skills:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const categories = ['All', ...new Set(skills.map((s) => s.category))];
  const filtered =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <motion.div
      className="page page--skills"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="section__title">Skills</h1>
          <p className="section__subtitle">Technologies & tools I work with</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="skills__categories" id="skill-categories"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`skills__category-btn ${
                activeCategory === cat ? 'skills__category-btn--active' : ''
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <Loader />
        ) : (
          <motion.div
            className="skills__grid"
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {filtered.map((skill, index) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <SkillBar
                  name={skill.name}
                  level={skill.level}
                  icon={iconMap[skill.icon]}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Skills;
