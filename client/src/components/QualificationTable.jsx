import { motion } from 'framer-motion';

const QualificationTable = ({ qualifications }) => {
  const statusClass = (status) => {
    switch (status) {
      case 'Distinction': return 'badge--distinction';
      case 'Pass':        return 'badge--pass';
      case 'Pursuing':    return 'badge--pursuing';
      case 'Fail':        return 'badge--fail';
      default:            return '';
    }
  };

  return (
    <div className="qual-table__wrapper">
      <table className="qual-table" id="qualification-table">
        <thead>
          <tr>
            <th>Degree / Exam</th>
            <th>Institution</th>
            <th>Year</th>
            <th>Percentage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {qualifications.map((q, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <td>{q.degree}</td>
              <td>{q.institution}</td>
              <td>{q.year}</td>
              <td>{q.percentage}</td>
              <td>
                <span className={`badge ${statusClass(q.status)}`}>
                  {q.status}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QualificationTable;
