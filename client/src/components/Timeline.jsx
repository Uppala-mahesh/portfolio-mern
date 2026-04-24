import { motion } from "framer-motion";

const Timeline = ({ qualifications }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Distinction":
        return "text-accentBlue bg-accentBlue/10 border-accentBlue/20";
      case "Pass":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Pursuing":
        return "text-accentPurple bg-accentPurple/10 border-accentPurple/20";
      case "Fail":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto py-8">
      {/* Vertical Line */}
      <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accentBlue/50 via-accentPurple/50 to-transparent -translate-x-1/2 rounded-full"></div>

      <div className="space-y-12">
        {qualifications.map((q, i) => {
          const isEven = i % 2 === 0;

          return (
            <div
              key={i}
              className={`relative flex flex-col md:flex-row items-center justify-between w-full`}
            >
              {/* Timeline Node */}
              <div className="absolute left-[39px] md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-accentBlue shadow-[0_0_10px_rgba(59,130,246,0.6)] -translate-x-1/2 z-10"></div>

              {/* Left Side (Empty on Mobile, alternates on Desktop) */}
              <div
                className={`hidden md:block w-5/12 ${isEven ? "order-1 text-right pr-8" : "order-3 pl-8"}`}
              >
                {isEven ? (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-xl font-bold font-mono text-white">
                      {q.year}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-xl font-bold font-mono text-white">
                      {q.year}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Center Spacer */}
              <div className="hidden md:block w-2/12 order-2"></div>

              {/* Right Side (Content) */}
              <motion.div
                className={`w-full pl-20 md:pl-0 md:w-5/12 ${isEven ? "order-3 md:pl-8" : "order-1 md:pr-8 md:text-right"}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="glass-card p-6 rounded-2xl hover:border-white/20 transition-colors bg-slate-900/40 relative group">
                  {/* Decorative corner glow */}
                  <div
                    className={`absolute top-0 ${isEven ? "left-0" : "right-0"} w-20 h-20 bg-accentBlue/10 blur-[30px] rounded-full z-0 group-hover:bg-accentBlue/20 transition-colors`}
                  ></div>

                  <div className="relative z-10">
                    <span className="md:hidden text-accentBlue font-mono text-sm mb-2 block">
                      {q.year}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {q.degree}
                    </h3>
                    <h4 className="text-sm font-medium text-slate-400 mb-4">
                      {q.institution}
                    </h4>

                    <div
                      className={`flex items-center gap-4 ${!isEven ? "md:justify-end" : ""}`}
                    >
                      <span className="text-sm text-slate-300 font-mono bg-white/5 px-3 py-1 rounded-md border border-white/10">
                        Score: {q.percentage}
                      </span>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(q.status)}`}
                      >
                        {q.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
