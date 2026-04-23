import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import QualificationTable from '../components/QualificationTable';
import Loader from '../components/Loader';

const Qualifications = () => {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQualifications = async () => {
      try {
        const { data } = await axios.get('/api/qualifications');
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section__title">Qualifications</h1>
          <p className="section__subtitle">My academic journey</p>
        </motion.div>

        {loading ? (
          <Loader />
        ) : (
          <QualificationTable qualifications={qualifications} />
        )}
      </div>
    </motion.div>
  );
};

export default Qualifications;
