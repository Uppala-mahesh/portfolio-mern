import { motion } from 'framer-motion';

const SkillBar = ({ name, level, icon }) => {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <div className="skill-bar__name">
          {icon && <span className="skill-bar__icon">{icon}</span>}
          <span>{name}</span>
        </div>
        <span className="skill-bar__level">{level}%</span>
      </div>
      <div className="skill-bar__track">
        <motion.div
          className="skill-bar__fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
