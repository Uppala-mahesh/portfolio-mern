import { motion } from 'framer-motion';

const CertificationCard = ({ cert, index, onView }) => {
  return (
    <motion.div
      className="cert-card"
      initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="cert-card__badge">🏆</div>
      <h3 className="cert-card__title">{cert.title}</h3>
      <p className="cert-card__issuer">{cert.issuer}</p>
      <p className="cert-card__date">{cert.date}</p>
      <p className="cert-card__description">{cert.description}</p>
      <button className="cert-card__btn" onClick={() => onView(cert)}>
        View Certificate
      </button>
    </motion.div>
  );
};

export default CertificationCard;
