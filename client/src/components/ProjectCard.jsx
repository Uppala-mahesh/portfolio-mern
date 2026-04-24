import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaFolderOpen } from "react-icons/fa";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="glass-card flex flex-col p-8 group relative overflow-hidden bg-slate-900/50 hover:bg-slate-800/80 transition-colors duration-500 hover:border-accentBlue/30"
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Top Header with Icons */}
      <div className="flex justify-between items-center mb-6 z-10 relative">
        <div className="text-4xl text-accentBlue group-hover:text-white transition-colors duration-300">
          <FaFolderOpen />
        </div>
        <div className="flex gap-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-xl text-slate-300 hover:text-accentPurple transition-colors hover:scale-110"
            >
              <FaGithub />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live Demo"
              className="text-xl text-slate-300 hover:text-accentBlue transition-colors hover:scale-110"
            >
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 z-10 relative">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accentBlue transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto z-10 relative">
        {project.technologies?.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs font-mono font-medium text-accentBlue bg-accentBlue/5 border border-accentBlue/20 rounded-full group-hover:border-accentBlue/40 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Background Hover Glow effect */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-accentBlue/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
    </motion.div>
  );
};

export default ProjectCard;
