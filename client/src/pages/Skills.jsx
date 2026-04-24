import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api";
import SkillCard from "../components/SkillCard";
import Loader from "../components/Loader";
import {
  SiJavascript,
  SiReact,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPython,
  SiLinux,
  SiGit,
} from "react-icons/si";
import {
  TbApi,
  TbBinaryTree,
  TbDatabase,
  TbNetwork,
  TbPuzzle,
} from "react-icons/tb";
import { MdDevices } from "react-icons/md";
import { FaCubes, FaAws } from "react-icons/fa";

/* Map icon strings to actual React components and brand hover colors */
const iconMap = {
  SiJavascript: {
    component: <SiJavascript />,
    color: "group-hover:text-yellow-400",
  },
  SiReact: { component: <SiReact />, color: "group-hover:text-cyan-400" },
  SiHtml5: { component: <SiHtml5 />, color: "group-hover:text-orange-500" },
  MdDevices: { component: <MdDevices />, color: "group-hover:text-slate-300" },
  SiNodedotjs: {
    component: <SiNodedotjs />,
    color: "group-hover:text-green-500",
  },
  SiExpress: { component: <SiExpress />, color: "group-hover:text-slate-200" },
  SiMongodb: { component: <SiMongodb />, color: "group-hover:text-green-600" },
  TbApi: { component: <TbApi />, color: "group-hover:text-accentBlue" },
  SiPython: { component: <SiPython />, color: "group-hover:text-blue-400" },
  TbBinaryTree: {
    component: <TbBinaryTree />,
    color: "group-hover:text-accentPurple",
  },
  TbBoxModel: { component: <FaCubes />, color: "group-hover:text-accentBlue" },
  TbDatabase: {
    component: <TbDatabase />,
    color: "group-hover:text-slate-400",
  },
  SiLinux: { component: <SiLinux />, color: "group-hover:text-yellow-500" },
  TbNetwork: {
    component: <TbNetwork />,
    color: "group-hover:text-accentPurple",
  },
  SiGit: { component: <SiGit />, color: "group-hover:text-orange-600" },
  TbPuzzle: { component: <TbPuzzle />, color: "group-hover:text-accentBlue" },
  FaAws: { component: <FaAws />, color: "group-hover:text-orange-400" },
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await api.get("/api/skills");
        setSkills(data);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Group skills by category for Bento Layout
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <motion.div
      className="min-h-[calc(100vh-80px)] py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Tech <span className="text-gradient-purple">Stack</span>
        </h1>
        <p className="text-slate-400">
          The tools and technologies I use to build scalable applications
        </p>
      </motion.div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Object.keys(categories).map((category, index) => {
            // Highlight MERN/Backend by giving it full width sometimes or specific styling
            const isFullWidth = index % 3 === 0;

            return (
              <motion.div
                key={category}
                className={`glass-card p-8 ${isFullWidth ? "lg:col-span-2" : ""} bg-slate-900/30 border border-white/10`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                  <div className="w-2 h-8 bg-accentBlue rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white tracking-wide">
                    {category}
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {categories[category].map((skill, i) => {
                    const iconData = iconMap[skill.icon] || {
                      component: <FaCubes />,
                      color: "group-hover:text-accentBlue",
                    };
                    return (
                      <motion.div
                        key={skill._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 + 0.2 }}
                      >
                        <SkillCard
                          name={skill.name}
                          icon={iconData.component}
                          hoverColorClass={iconData.color}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Skills;
