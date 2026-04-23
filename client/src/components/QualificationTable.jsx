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
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
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
