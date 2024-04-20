import { useState, useEffect } from 'react';
import styles from './styling/styles.module.css';


const Form4 = ({ formData, onSubmit }) => {
  const [newFormData, setNewFormData] = useState({
    no_of_OE: '',
  });

  // UseEffect to update newFormData whenever formData changes
  useEffect(() => {
    setNewFormData({
      no_of_OE: '',
      ...formData, // Include data from Form1
    });
  }, [formData]);

  const handleChange = (e) => {
    setNewFormData({ ...newFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newFormData);
  };

  const rel4 = () => {
    formData.ur.reload();
  };

  return (
    <div className={styles.container}>
      <h2>{formData.selected_course_category && (formData.selected_course_category)}{!formData.selected_course_category && (formData.course_category)} Course Offer</h2>
      {/* Display data from Form1 */}
      {formData && (
        <div>
          <p>Session Year: {formData.session_year}</p>
          <p>Session: {formData.session}</p>
          <p>Course: {formData.course}</p>
          <p>Branch: {formData.branch}</p>
          <p>Department : {formData.department}</p>
          <p>Semester: {formData.semester}</p>
          <p>Batch: {formData.batch}</p>
          <p>Course Component: {formData.course_component}</p>
          <p>Course Category: {formData.course_category}</p>
        </div>
      )}
      {/* Form 2 inputs */}
      <form onSubmit={handleSubmit}>
        <input type="number" name="no_of_OE" value={newFormData.no_of_OE} onChange={handleChange} placeholder='Number of OE' required/>
        <button type="submit">Next</button>
      </form>
      <button onClick={() => rel4(formData)}>Reset</button>
    </div>
  );
};

export default Form4;
