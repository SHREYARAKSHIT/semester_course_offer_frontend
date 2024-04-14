import { useState, useEffect } from 'react';
import { Post, Get } from 'src/configs/Reqmethod';

const Form6 = ({ formData, onSubmit }) => {
  const [twoseparatecourselist, setTwoseparatecourselist] = useState([]);
  const [newFormData, setNewFormData] = useState({
    selected_course_category: ''
  });

  // UseEffect to update newFormData whenever formData changes
  useEffect(() => {
    const handleInputClick6 = async () => {
      try{
        await Post('gettwoseparatecourse',{formData}).then(async tsclis=>{
          console.log(tsclis.data.data);
          setTwoseparatecourselist(tsclis.data.data); // Assuming the output is in the "output" key
        });
      }catch (error) {
        console.error('Error:', error);
      }
    }
    handleInputClick6();
    setNewFormData({
      selected_course_category: '',
      ...formData, // Include data from Form6
    });
  }, [formData]);

  const handleChange = (e) => {
    setNewFormData({ ...newFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newFormData);
  };

  const rel6 = () => {
    formData.ur.reload();
  };


  return (
    <div>
      <h2>{formData.course_category} Course Offer</h2>
      {/* Display data from Form6 */}
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
        <select name="selected_course_category" value={newFormData.selected_course_category} onChange={handleChange} required>
          <option value="">Select Any One</option>
          <option value={twoseparatecourselist[0]}>{twoseparatecourselist[0]}</option>
          <option value={twoseparatecourselist[1]}>{twoseparatecourselist[1]}</option>
        </select>
        <button type="submit">Next</button>
      </form>
      <button onClick={() => rel6(formData)}>Reset</button>
    </div>
  );
};

export default Form6;
