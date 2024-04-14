import { useState, useEffect } from 'react';
import { Post, Get } from 'src/configs/Reqmethod';

const Form8 = ({ formData, onSubmit }) => {
  const [subjectnamelist, setSubjectnamelist] = useState([]);
  const [introsesyear, setIntrosesyear] = useState([]);
  const [deptoffacultylist, setDeptoffacultylist] = useState([]);
  const [newFormData, setNewFormData] = useState({
    subject_name: '',
    subject_code: '',
    introduced_session_year:'',
    introduced_session:'',
    lecture: '',
    tutorial:'',
    practical: '',
    credit_hours: '',
    contact_hours: '',
    subject_type: '',
    prerequisite: '',
    prerequisite_sub_code: 'NA',
    full_marks: '',
    no_of_part: '',
    criteria: '',
    min_stu: '',
    max_stu: '',
    remarks: '',
    same_branch_opt_status: false,
  });
  const [tableDataFormat, setTableDataFormat] = useState({
    part: '',
    dept_name_of_faculty: '',
    faculty:'',
    marks_upload_right:'',
  });
  const [tableData, setTableData] = useState([{...tableDataFormat, marks_upload_right:"1"}]);
  const handleAddRow = () => {
    setTableData([...tableData, { ...tableDataFormat , marks_upload_right:"0"}]);
  };
  const handleRemoveRow = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index);
    setTableData(updatedTableData);
  };
  const handleChangeRow = (index, field, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index][field] = value;
    setTableData(updatedTableData);
  };
  // UseEffect to update newFormData whenever formData changes
  useEffect(() => {
    setNewFormData({
      subject_name: '',
      subject_code: '',
      introduced_session_year:'',
      introduced_session:'',
      lecture: '',
      tutorial:'',
      practical: '',
      credit_hours: '',
      contact_hours: '',
      subject_type: '',
      prerequisite: '',
      prerequisite_sub_code: 'NA',
      full_marks: '',
      no_of_part: '',
      criteria: '',
      min_stu: '',
      max_stu: '',
      remarks: '',
      same_branch_opt_status: false,
      ...formData, // Include data from Form1
    });
    setTableData([{...tableDataFormat, marks_upload_right:"1"}]);
    const handlesubname = async () => {
      try{
        await Post('getsubname',{department: formData.department}).then(async subnamelis=>{
          console.log(subnamelis.data.data);
          setSubjectnamelist(subnamelis.data.data); // Assuming the output is in the "output" key
        });
        await Get('getdeptoffaculty').then(async deptoffaclis=>{
          console.log(deptoffaclis.data.data);
          setDeptoffacultylist(deptoffaclis.data.data); // Assuming the output is in the "output" key
        });
      }catch (error) {
        console.error('Error:', error);
      }
    }
    handlesubname();
  }, [formData]);

  const Selectpart = ({ n }) => {
    const maxValue = parseInt(n, 10);
    const options = [];
    for (let i = 1; i <= maxValue; i++) {
      options.push(<option key={i} value={`p${i}`}>{`p${i}`}</option>);
    }
    return options;
  };

  const handleChange = (e) => {
    setNewFormData({ ...newFormData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setNewFormData({ ...newFormData, same_branch_opt_status: !newFormData.same_branch_opt_status});
  };

  const rel8 = () => {
    formData.ur.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to submit?');
    if (isConfirmed) {
      onSubmit(newFormData, tableData);
    }
  };

  const handleChangesn = async (e) => {
    //setNewFormData({...newFormData, [e.target.name]:e.target.value});
    setNewFormData({...newFormData, [e.target.name]:e.target.value, introduced_session_year:'', subject_code: '' , introduced_session: '', lecture: '', tutorial: '', practical: '', credit_hours: '', contact_hours: '', subject_type: ''})
    try{
      const selectedOption = subjectnamelist.find((row) => row.sub_name === e.target.value);
      if(selectedOption){await Post('getsubdetail',{department: formData.department, subject_name: e.target.value,  subject_code: selectedOption.sub_code}).then(async subdetlis=>{
        console.log(subdetlis.data.data);
        setIntrosesyear(subdetlis.data.data);
        //introduced_session_year: newFormData.introduced_session_year;
        //setNewFormData({...newFormData, subject_name: subdetlis.data.data[0].sub_name, subject_code: subdetlis.data.data[0].sub_code , introduced_session: subdetlis.data.data[0].wef_session, lecture: subdetlis.data.data[0].lecture, tutorial: subdetlis.data.data[0].tutorial, practical: subdetlis.data.data[0].practical, credit_hours: subdetlis.data.data[0].credit_hours, contact_hours: subdetlis.data.data[0].contact_hours, subject_type: subdetlis.data.data[0].sub_type});
      });}
    } catch (error) {
      console.error('Error:', error);
      //setError(error.message);
      
    }
  };

  const handleChangeisy= (e) => {
    const selectedOption = introsesyear.find((row) => row.wef_year === e.target.value);
    if(selectedOption){
      setNewFormData({...newFormData, introduced_session_year: selectedOption.wef_year, subject_code: selectedOption.sub_code , introduced_session: selectedOption.wef_session, lecture: selectedOption.lecture, tutorial: selectedOption.tutorial, practical: selectedOption.practical, credit_hours: selectedOption.credit_hours, contact_hours: selectedOption.contact_hours, subject_type: selectedOption.sub_type});
    }
  };

  return(
    <div>
      <button onClick={() => rel8(formData)}>Reset</button>
      <h2>OE Course Selection</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="session_year">Session Year: </label>
          <input type="text" name="session_year" value={formData.session_year} disabled/>
          <label for="session">Session: </label>
          <input type="text" name="session" value={formData.session} disabled/>
          <label for="course">Course: </label>
          <input type="text" name="course" value={formData.course} disabled/>
        </div>
        <div>
          <label for="branch">Branch: </label>
          <input type="text" name="branch" value={formData.branch} disabled/>
          <label for="department">Department: </label>
          <input type="text" name="department" value={formData.department} disabled/>
          <label for="semester">Semester: </label>
          <input type="text" name="semester" value={formData.semester} disabled/>
        </div>
        <div>
          <label for="batch">Batch: </label>
          <input type="text" name="batch" value={formData.batch} disabled/>
          <label for="course_component">Course Component: </label>
          <input type="text" name="course_component" value={formData.course_component} disabled/>
          <label for="course_category">Course Category: </label>
          <input type="text" name="course_category" value={formData.course_category} disabled/>
        </div>
        <p></p>
        <div>
          <label for="subject_name">Subject Name: </label>
          <select name="subject_name" value={newFormData.subject_name} onChange={handleChangesn} required>
            <option value="">Select Subject</option>
            {subjectnamelist.map((row) => (
                <option value={row.sub_name}>{row.sub_name} ({row.sub_code})</option> 
            ))}
          </select>
          <label for="introduced_session_year">Introduced Session Year: </label>
          <select name="introduced_session_year" value={newFormData.introduced_session_year} onChange={handleChangeisy} required>
            <option value="">Select Introduced Session Year</option>
            {introsesyear.map((row) => (
                <option value={row.wef_year}>{row.wef_year}</option> 
            ))}
          </select>
        </div>
        <div>
          <label for="introduced_session">Introduced Session: </label>
          <input type="text" name="introduced_session" value={newFormData.introduced_session} onChange={handleChange} disabled/>
          <label for="subject_code">Subject Code: </label>
          <input type="text" name="subject_code" value={newFormData.subject_code} onChange={handleChange} disabled/>
        </div>
        <div>
          <label for="lecture">Lecture: </label>
          <input type="text" name="lecture" value={newFormData.lecture} onChange={handleChange} disabled/>
          <label for="tutorial">Tutorial: </label>
          <input type="text" name="tutorial" value={newFormData.tutorial} onChange={handleChange} disabled/>
          <label for="practical">Practical: </label>
          <input type="text" name="practical" value={newFormData.practical} onChange={handleChange} disabled/>
        </div>
        <div>
          <label for="credit_hours">Credit Hours: </label>
          <input type="text" name="credit_hours" value={newFormData.credit_hours} onChange={handleChange} disabled/>
          <label for="contact_hours">Contact Hours: </label>
          <input type="text" name="contact_hours" value={newFormData.contact_hours} onChange={handleChange} disabled/>
          <label for="subject_type">Subject Type: </label>
          <input type="text" name="subject_type" value={newFormData.subject_type} onChange={handleChange} disabled/>
        </div>
        <p></p>
        <div>
          <label for="prerequisite">Prerequisite: </label>
          <select name="prerequisite" value={newFormData.prerequisite} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {newFormData.prerequisite==='yes' &&(
            <div>
            <label for="prerequisite_sub_code">Prerequisite Subject Code: </label>
            <select name="prerequisite_sub_code" value={newFormData.prerequisite_sub_code} onChange={handleChange} required>
              <option value="NA">Select</option>
              {subjectnamelist.map((row) => (
                <option value={row.sub_code}>{row.sub_code} -{row.sub_name}</option> 
              ))}
            </select>
            </div>
          )}
        </div>
        <p></p>
        <div>
          <label for="full_marks">Full Marks: </label>
          <input type="text" name="full_marks" value={newFormData.full_marks} onChange={handleChange} required/>
          <label for="no_of_part">Number of part: </label>
          <input type="text" name="no_of_part" value={newFormData.no_of_part} onChange={handleChange} required/>
          <label for="criteria">Criteria: </label>
          <select name="criteria" value={newFormData.criteria} onChange={handleChange} required>
            <option value="">Select Criteria</option>
            <option value="ogpa">OGPA</option>
            <option value="default">Default</option>
            <option value="lottery">Lottery</option>
            <option value="NA">NA</option>
          </select>
        </div>
        <div>
          <label for="min_stu">Minimum number of students: </label>
          <input type="text" name="min_stu" value={newFormData.min_stu} onChange={handleChange} required/>
          <label for="max_stu">Maximum number of students: </label>
          <input type="text" name="max_stu" value={newFormData.max_stu} onChange={handleChange} required/>
        </div>
        <div>
          <label for="remarks">Remarks: </label>
          <input type="text" name="remarks" value={newFormData.remarks} onChange={handleChange} required/>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={newFormData.same_branch_opt_status} // Control the checkbox state with isChecked
              onChange={handleCheckboxChange} // Handle checkbox change
            />
            Can students of this department opt for it?
          </label>
        </div>
        <p></p>
        <div>
          <table>
            <thead>
              <tr>
                <th>Part</th>
                <th>Department Name</th>
                <th>Faculty</th>
                <th>Marks Upload Right</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tada, index) => (
                <tr key={index}>
                  <td>
                    <select value={tada.part} onChange={(e) => handleChangeRow(index, 'part', e.target.value)} required>
                      <option value="">Select Part</option>
                      <Selectpart n={newFormData.no_of_part} />
                    </select>
                  </td>
                  <td>
                    <select value={tada.dept_name_of_faculty} onChange={(e) => handleChangeRow(index, 'dept_name_of_faculty', e.target.value)} required>
                      <option value="">Select Department</option>
                      {deptoffacultylist.map((row) => (
                        <option value={row.id}>{row.name}-{row.id}</option> 
                      ))}
                    </select>
                  </td>
                  <td>
                    <select value={tada.faculty} onChange={(e) => handleChangeRow(index, 'faculty', e.target.value)} required>
                      <option value="">Select</option>
                      <option value="NA">NA</option>
                    </select>
                  </td>
                  <td>
                  {index===0 &&(
                    <select value={tada.marks_upload_right} onChange={(e) => handleChangeRow(index, 'marks_upload_right', e.target.value)} disabled>
                      <option value="">Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                  )}
                  {index!==0 &&(
                    <select value={tada.marks_upload_right} onChange={(e) => handleChangeRow(index, 'marks_upload_right', e.target.value)} disabled>
                      <option value="">Select</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                  )}
                  </td>
                  {index!==0 &&(
                  <td>
                    <button type="button" onClick={() => handleRemoveRow(index)}>-</button>
                  </td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={handleAddRow}>+</button>
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
  );
};

export default Form8;
