import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <motion.div
      className="min-h-[calc(100vh-80px)] py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-gradient-purple">Touch</span>
          </h1>
          <p className="text-slate-400">Let's build something together</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info Sidebar */}
          <motion.div
            className="lg:col-span-2 glass-card p-8 rounded-2xl bg-slate-900/40 border-white/10 flex flex-col"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Contact Information
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Feel free to reach out for collaborations, projects, or just a
              friendly conversation about technology.
            </p>

            <div className="flex flex-col gap-6 mb-12 flex-1">
              {[
                {
                  icon: <FaEnvelope />,
                  label: "Email",
                  value: "uppala.mahesh@email.com",
                },
                { icon: <FaMapMarkerAlt />, label: "Location", value: "India" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accentBlue/10 flex items-center justify-center text-accentBlue shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                      {item.label}
                    </span>
                    <span className="block text-sm text-slate-300">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-8 border-t border-white/10">
              <a
                href="https://github.com/Uppala-mahesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/uppala-mahesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium"
              >
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
