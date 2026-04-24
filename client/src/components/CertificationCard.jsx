import { motion } from "framer-motion";

const CertificationCard = ({ cert, index, onView }) => {
  return (
    <motion.div
      className="glass-card flex flex-col p-8 rounded-2xl text-center bg-slate-900/40 border border-white/10 hover:border-accentBlue/30 transition-all duration-300 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
    >
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
        🏆
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
      <p className="text-accentBlue text-sm font-medium mb-1">{cert.issuer}</p>
      <p className="text-slate-500 text-xs font-mono mb-4">{cert.date}</p>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
        {cert.description}
      </p>
      <button
        className="w-full py-2 px-4 rounded-lg border border-accentBlue/30 text-accentBlue hover:bg-accentBlue hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 text-sm font-medium"
        onClick={() => onView(cert)}
      >
        View Details
      </button>
    </motion.div>
  );
};

export default CertificationCard;
