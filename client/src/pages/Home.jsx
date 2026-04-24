import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api";
import HeroSection from "../components/HeroSection";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/Loader";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get("/api/projects");
        setProjects(data.filter((p) => p.featured));
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const stats = [
    { value: "5+", label: "Projects Built" },
    { value: "16+", label: "Skills Acquired" },
    { value: "4+", label: "Certifications" },
    { value: "2+", label: "Years Learning" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />

      {/* Featured Projects */}
      <section className="py-24 relative" id="featured-projects">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured <span className="text-gradient-purple">Projects</span>
            </h2>
            <p className="text-slate-400">Some of my recent work</p>
          </motion.div>

          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-24 relative bg-slate-900/20 backdrop-blur-sm border-t border-b border-white/5"
        id="stats"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="glass-card flex flex-col items-center justify-center p-8 bg-background/40 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="text-4xl md:text-5xl font-bold font-mono text-gradient-blue mb-2">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-slate-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
