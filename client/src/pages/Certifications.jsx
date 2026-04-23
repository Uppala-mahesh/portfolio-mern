import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import CertificationCard from '../components/CertificationCard';
import Modal from '../components/Modal';
import Loader from '../components/Loader';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const { data } = await axios.get('/api/certifications');
        setCertifications(data);
      } catch (err) {
        console.error('Failed to fetch certifications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertifications();
  }, []);

  return (
    <motion.div
      className="page page--certifications"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section__title">Certifications</h1>
          <p className="section__subtitle">Credentials &amp; achievements</p>
        </motion.div>

        {loading ? (
          <Loader />
        ) : (
          <div className="cert-grid">
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
          <div className="cert-modal">
            <div className="cert-modal__badge">🏆</div>
            <h3>{selectedCert.title}</h3>
            <p className="cert-modal__issuer">Issued by: {selectedCert.issuer}</p>
            <p className="cert-modal__date">Date: {selectedCert.date}</p>
            <p className="cert-modal__description">{selectedCert.description}</p>
            {selectedCert.credentialUrl && selectedCert.credentialUrl !== '#' && (
              <a
                href={selectedCert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-modal__link"
              >
                View Credential →
              </a>
            )}
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Certifications;
