import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaGraduationCap,
} from "react-icons/fa";
import Loader from "../components/Loader";

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/api/profile");
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Profile not found. Please seed the database.
      </div>
    );

  return (
    <motion.div
      className="min-h-[calc(100vh-80px)] py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-gradient-purple">Me</span>
          </h1>
          <p className="text-slate-400">Get to know who I am</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Avatar Area */}
          <motion.div
            className="w-full lg:w-1/3 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="relative w-64 h-64 rounded-2xl bg-slate-900/50 border border-white/10 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accentBlue/20 to-accentPurple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-6xl font-bold font-mono text-gradient-blue relative z-10">
                UM
              </span>
            </div>
          </motion.div>

          {/* Info Card */}
          <motion.div
            className="w-full lg:w-2/3 glass-card p-8 rounded-3xl bg-slate-900/40 border border-white/10"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {profile.name}
              </h2>
              <p className="text-accentBlue font-medium">{profile.title}</p>
            </div>

            <div className="text-slate-300 space-y-4 mb-8 leading-relaxed">
              {profile.summary
                ?.split("\n")
                .map((paragraph, i) =>
                  paragraph.trim() ? <p key={i}>{paragraph}</p> : null,
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 text-slate-400">
                <FaMapMarkerAlt className="text-accentPurple text-lg" />
                <span className="text-sm">{profile.location}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <FaEnvelope className="text-accentPurple text-lg" />
                <span className="text-sm">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 sm:col-span-2">
                <FaGraduationCap className="text-accentPurple text-lg" />
                <span className="text-sm">
                  B.Tech IT — Vasavi College of Engineering
                </span>
              </div>

              <div className="flex gap-4 mt-4 sm:col-span-2">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all text-sm font-medium text-slate-300"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all text-sm font-medium text-slate-300"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
