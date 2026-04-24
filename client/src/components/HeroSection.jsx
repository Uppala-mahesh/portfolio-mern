import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowDown, HiDownload } from "react-icons/hi";

const roles = [
  "Full Stack Developer",
  "MERN Specialist",
  "UI/UX Enthusiast",
  "Problem Solver",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () =>
          setText(
            current.substring(
              0,
              isDeleting ? text.length - 1 : text.length + 1,
            ),
          ),
        isDeleting ? 40 : 100,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section
      className="min-h-[calc(100vh-80px)] flex items-center justify-center relative"
      id="hero"
    >
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 py-10">
        {/* Left: Text Content */}
        <motion.div
          className="flex-1 text-center lg:text-left z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-accentBlue/30 bg-accentBlue/10 text-accentBlue text-sm font-mono tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Available for new opportunities
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Hi, I'm <span className="text-gradient-blue">Mahesh</span>
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl font-mono text-slate-400 mb-8 h-8 flex items-center justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="mr-2">&gt;</span>
            <span className="text-slate-200">{text}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-3 h-6 bg-accentBlue ml-1 align-middle"
            />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              to="/skills"
              className="px-8 py-3 rounded-lg bg-accentBlue text-white font-medium hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 transform hover:-translate-y-1"
            >
              View My Work
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 hover:border-white/40 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: Glass Card & Profile Image */}
        <motion.div
          className="flex-1 relative z-10 flex justify-center w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative Glow Behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accentBlue/20 blur-[100px] rounded-full z-0"></div>

          <motion.div
            className="relative z-10 glass-card p-8 w-full backdrop-blur-xl border border-white/10 bg-slate-900/40 shadow-2xl rounded-2xl overflow-hidden group"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-30">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M60 0H0V60H60V0Z" fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="0"
                    y1="0"
                    x2="60"
                    y2="60"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accentBlue to-accentPurple p-1">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center font-bold text-xl text-white">
                  UM
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Introduction</h3>
                <p className="text-xs text-accentBlue font-mono">
                  Software Engineer
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 relative z-10">
              I am a passionate developer with a strong foundation in designing
              scalable systems, building intelligent applications, and exploring
              the intersection of software and innovation.
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-xs text-slate-500 font-mono">
                MERN Stack Expert
              </span>
              <a
                href="https://linkedin.com/in/uppala-mahesh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs flex items-center gap-1 text-accentPurple hover:text-white transition-colors"
              >
                <HiDownload /> Profile
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs font-mono tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HiArrowDown className="text-lg text-accentBlue" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
