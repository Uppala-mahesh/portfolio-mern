import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';
import QualificationTable from '../components/QualificationTable';
import Loader from '../components/Loader';

const Qualifications = () => {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQualifications = async () => {
      try {
        const { data } = await api.get('/api/qualifications');
        setQualifications(data);
      } catch (err) {
        console.error('Failed to fetch qualifications:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQualifications();
  }, []);

  return (
    <motion.div
      className="page page--qualifications"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        <motion.div
          className="section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="section__title">Qualifications</h1>
          <p className="section__subtitle">My academic journey</p>
        </motion.div>

        {loading ? (
          <Loader />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <QualificationTable qualifications={qualifications} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Qualifications;
