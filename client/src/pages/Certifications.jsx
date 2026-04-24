import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api";
import CertificationCard from "../components/CertificationCard";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const { data } = await api.get("/api/certifications");
        setCertifications(data);
      } catch (err) {
        console.error("Failed to fetch certifications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertifications();
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
            <span className="text-gradient-purple">Certifications</span>
          </h1>
          <p className="text-slate-400">Credentials & achievements</p>
        </motion.div>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert._id}
                cert={cert}
                index={index}
                onView={setSelectedCert}
              />
            ))}
          </div>
        )}
      </div>

      {/* Certificate Preview Modal */}
      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title={selectedCert?.title}
      >
        {selectedCert && (
          <div className="text-center flex flex-col items-center">
            <div className="text-5xl mb-6">🏆</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {selectedCert.title}
            </h3>
            <p className="text-accentBlue font-medium mb-2">
              Issued by: {selectedCert.issuer}
            </p>
            <p className="text-slate-500 text-sm font-mono mb-6">
              Date: {selectedCert.date}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              {selectedCert.description}
            </p>

            {selectedCert.credentialUrl &&
              selectedCert.credentialUrl !== "#" && (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-accentBlue to-accentPurple text-white font-medium hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-105 transition-all duration-300"
                >
                  View Credential &rarr;
                </a>
              )}
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Certifications;
