import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api";
import Timeline from "../components/Timeline";
import Loader from "../components/Loader";

const Qualifications = () => {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQualifications = async () => {
      try {
        const { data } = await api.get("/api/qualifications");
        setQualifications(data);
      } catch (err) {
        console.error("Failed to fetch qualifications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQualifications();
  }, []);

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
            My <span className="text-gradient-blue">Timeline</span>
          </h1>
          <p className="text-slate-400">Academic journey and qualifications</p>
        </motion.div>

        {loading ? <Loader /> : <Timeline qualifications={qualifications} />}
      </div>
    </motion.div>
  );
};

export default Qualifications;
