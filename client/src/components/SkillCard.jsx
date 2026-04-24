import { motion } from "framer-motion";

const SkillCard = ({
  name,
  icon,
  hoverColorClass = "group-hover:text-accentBlue",
}) => {
  return (
    <motion.div
      className="glass-card flex flex-col items-center justify-center p-6 gap-3 group hover:-translate-y-2 transition-all duration-300 hover:border-accentBlue/40 cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      <div
        className={`text-4xl text-slate-400 transition-colors duration-300 ${hoverColorClass}`}
      >
        {icon}
      </div>
      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
        {name}
      </span>
    </motion.div>
  );
};

export default SkillCard;
