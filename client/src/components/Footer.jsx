import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="bg-background border-t border-white/10 py-12 relative overflow-hidden"
      id="footer"
    >
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accentPurple to-transparent opacity-50 blur-[1px]"></div>

      <div className="max-w-7xl mx-auto px-6 text-center z-10 relative">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold font-mono tracking-wider mb-2 text-white">
            UM<span className="text-accentBlue">.</span>
          </h3>
          <p className="text-slate-400 text-sm">
            Building the future, one line at a time.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            {
              icon: <FaGithub />,
              link: "https://github.com/Uppala-mahesh",
              label: "GitHub",
            },
            {
              icon: <FaLinkedin />,
              link: "https://linkedin.com/in/uppala-mahesh",
              label: "LinkedIn",
            },
            {
              icon: <FaEnvelope />,
              link: "mailto:uppala.mahesh@email.com",
              label: "Email",
            },
          ].map((social, i) => (
            <a
              key={i}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center text-xl text-slate-400 border border-white/10 rounded-full hover:text-accentBlue hover:border-accentBlue/30 hover:bg-accentBlue/5 hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

        <div className="flex items-center justify-center gap-8 pt-8 border-t border-white/10">
          <p className="text-slate-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Uppala Mahesh. All rights
            reserved.
          </p>
          <button
            className="w-10 h-10 flex items-center justify-center text-accentPurple border border-white/10 rounded-full hover:bg-accentPurple hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all duration-300"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <HiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
