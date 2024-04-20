import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Post, Get } from 'src/configs/Reqmethod';
import Grid from '@mui/material/Grid';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import Form4 from './Form4';
import Form5 from './Form5';
import Form6 from './Form6';
import Form7 from './Form7';
import Form8 from './Form8';
import Form9 from './Form9';
import Form10 from './Form10';
import Form11 from './Form11';
import Modal from './Modal';
import styles from './styling/styles.module.css';

const MainPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [currentForm, setCurrentForm] = useState(0); // Start with 0 to indicate initial state
  const [response, setResponse] = useState(false);
  const [selected_course_category, setSelected_course_category] = useState(null);
  const [no_of_com, setNo_of_com] = useState(0);
  const [sessionyearlist, setSessionyearlist] = useState([]);
  const [sessionlist, setSessionlist] = useState([]);
  const [batchlist, setBatchlist] = useState([]);
  const [courseelist, setCourseelist] = useState([]);
  const [brancheelist, setBrancheelist] = useState([]);
  const [departmentlist, setDepartmentlist] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [formData, setFormData] = useState({
    ur:window.location,
    session_year: '',
    session: '',
    course: '',
    branch: '',
    department: '',
    semester: '',
    batch: '',
  });
  const [inputData, setInputData] = useState({
    ur:window.location,
    session_year: '',
    session: '',
    course: '',
    branch: '',
    department: '',
    semester: '',
    batch: '',
  });

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setApiData(null);
    setResponse(false);
    setNo_of_com(0);
    setSelected_course_category(null);
    setModalOpen(false);
  };

  const handleFormSubmit = (row) => {
    setFormData({ ...formData, course_component: row.course_component, course_category: row.sequence});
    setInputData({ ...inputData, course_component: row.course_component, course_category: row.sequence});
    if(row.course_component==='DC'){setCurrentForm(1);}
    else if(row.course_component==='DP'){setCurrentForm(2);}
    else if(row.course_component==='DE'){setCurrentForm(3);}
    else if(row.course_component==='OE'){setCurrentForm(4);}
    else if(row.course_component==='ESO'){setCurrentForm(5);}
    else if(row.course_component==='DC/OE'){setCurrentForm(6);}
    else if(row.course_component==='DC/DE'){setCurrentForm(6);}
    else if(row.course_component==='DE/OE'){setCurrentForm(6);}
    else if(row.course_component==='IC'){setCurrentForm(10);}
    else if(row.course_component==='TU'){setCurrentForm(11);}
    else {setCurrentForm(100);}
  };

  const handleSubDelete = async (row) => {
    //setFormData({ ...formData, course_component: row.course_component, course_category: row.sequence});
    //setInputData({ ...inputData, course_component: row.course_component, course_category: row.sequence});
    try {
      const isConfirmed = window.confirm('Are you sure you want to delete the course?');
      if(isConfirmed){await Post('subdelete',{formData,course_category:row.sequence}).then(async subdel=>{
            console.log(subdel.data.data);
            setFormData(inputData);
            setResponse(false);
            setApiData(null);
            setNo_of_com(0);
            setSelected_course_category(null);
            setCurrentForm(0);
            setModalOpen(false);
            window.alert('Course deleted successfully!');
      });}
  } catch (error) {
    console.error('Error:', error);
    window.alert('Error!');
  }
  };

  const fetchCourseData = async (row) => {
    //setFormData({ ...formData, course_component: row.course_component, course_category: row.sequence});
    //setInputData({ ...inputData, course_component: row.course_component, course_category: row.sequence});
    try {
            await Post('fetchcoursedata',{formData,course_category:row.sequence}).then(async coudatlis=>{
            console.log(coudatlis.data.data);
            setModalData(coudatlis.data.data);
            setModalOpen(true);
    });} catch (error) {
    console.error('Error:', error);
    window.alert('Error!');
  }
  };

  const handleForm3Submit = (data) => {
    setFormData(data);
    setNo_of_com(data.no_of_DE);
    setCurrentForm(7);
  };

  const handleForm4Submit = (data) => {
    setFormData(data);
    setNo_of_com(data.no_of_OE);
    setCurrentForm(8);
  };

  const handleForm5Submit = (data) => {
    setFormData(data);
    setNo_of_com(data.no_of_ESO);
    setCurrentForm(9);
  };

  const handleForm6Submit = (data) => {
    setFormData(data);
    setSelected_course_category(data.selected_course_category);
    if (data.selected_course_category.startsWith('OE')) {
      setCurrentForm(4);
    } else if (data.selected_course_category.startsWith('DC')) {
      setCurrentForm(1);
    }else if (data.selected_course_category.startsWith('DE')) {
      setCurrentForm(3);
    } else {
      setCurrentForm(100);
    }
  };

  const plusCourse = (data) => {
    if(data.sub_category.startsWith('OE')){
      if(data.sub_category==data.sequence){
        setFormData({ ...formData, course_component: data.course_component, course_category: data.sequence, no_of_OE:1});
        setInputData({ ...inputData, course_component: data.course_component, course_category: data.sequence});
        setNo_of_com(1);
      }else{
        setFormData({ ...formData, course_component: data.course_component, course_category: data.sequence, no_of_OE:1, selected_course_category:data.sub_category});
        setInputData({ ...inputData, course_component: data.course_component, course_category: data.sequence});
        setNo_of_com(1);
        setSelected_course_category(data.sub_category);
      }
      setCurrentForm(8);
    }
    else if(data.sub_category.startsWith('DE')){
      if(data.sub_category==data.sequence){
        setFormData({ ...formData, course_component: data.course_component, course_category: data.sequence, no_of_DE:1});
        setInputData({ ...inputData, course_component: data.course_component, course_category: data.sequence});
        setNo_of_com(1);
      }else{
        setFormData({ ...formData, course_component: data.course_component, course_category: data.sequence, no_of_DE:1, selected_course_category:data.sub_category});
        setInputData({ ...inputData, course_component: data.course_component, course_category: data.sequence});
        setNo_of_com(1);
        setSelected_course_category(data.sub_category);
      }
      setCurrentForm(7);
    }
    else if(data.sub_category.startsWith('ESO')){
      if(data.sub_category==data.sequence){
        setFormData({ ...formData, course_component: data.course_component, course_category: data.sequence, no_of_ESO:1});
        setInputData({ ...inputData, course_component: data.course_component, course_category: data.sequence});
        setNo_of_com(1);
      }else{
        setFormData({ ...formData, course_component: data.course_component, course_category: data.sequence, no_of_ESO:1, selected_course_category:data.sub_category});
        setInputData({ ...inputData, course_component: data.course_component, course_category: data.sequence});
        setNo_of_com(1);
        setSelected_course_category(data.sub_category);
      }
      setCurrentForm(9);
    }
  }

  const modalsub = () => {
      setFormData(inputData);
      setResponse(false);
      setApiData(null);
      setNo_of_com(0);
      setSelected_course_category(null);
      setCurrentForm(0);
      setModalOpen(false);
  };
  

  const handleSubmit = () => {
    //window.location.reload(); // Reload the page
    setFormData(inputData);
    setResponse(false);
    setApiData(null);
    setNo_of_com(0);
    setSelected_course_category(null);
    setCurrentForm(0);
    setModalOpen(false);
  };

  const handleSubmit1 = async (data1,data2) => {
    try {
      await Post('sub1',{data1,data2}).then(async sub1=>{
            console.log(sub1.data.data);
            setFormData(inputData);
            setResponse(false);
            setApiData(null);
            setCurrentForm(0);
            setNo_of_com(0);
            setSelected_course_category(null);
            setModalOpen(false);
            window.alert('Course offered successfully!');
      });
  } catch (error) {
    console.error('Error:', error);
    window.alert('Error!');
  }
  };

  const handleSubmit11 = async (data1,data2) => {
    try {
      await Post('sub11',{data1,data2}).then(async sub11=>{
            console.log(sub11.data.data);
            setFormData(inputData);
            setResponse(false);
            setApiData(null);
            setCurrentForm(0);
            setNo_of_com(0);
            setSelected_course_category(null);
            setModalOpen(false);
            window.alert('Course offered successfully!');
      });
  } catch (error) {
    console.error('Error:', error);
    window.alert('Error!');
  }
  };

  const handleSubmit7 = async (data1,data2) => {
    try {
      await Post('sub7',{data1,data2}).then(async sub7=>{
            console.log(sub7.data.data);
            window.alert('Course offered successfully!');
            if(no_of_com>1){
              setFormData({...inputData, selected_course_category: selected_course_category, no_of_DE:no_of_com});
              setNo_of_com(no_of_com-1);
              setCurrentForm(7);
            }else{
            setFormData(inputData);
            setResponse(false);
            setApiData(null);
            setCurrentForm(0);
            setNo_of_com(0);
            setSelected_course_category(null);
            setModalOpen(false);
          }
      });
  } catch (error) {
    console.error('Error:', error);
    window.alert('Error!');
  }
  };

  const handleSubmit8 = async (data1,data2) => {
    try {
      await Post('sub8',{data1,data2}).then(async sub8=>{
            console.log(sub8.data.data);
            window.alert('Course offered successfully!');
            if(no_of_com>1){
              setFormData({...inputData, selected_course_category: selected_course_category, no_of_OE:no_of_com});
              setNo_of_com(no_of_com-1);
              setCurrentForm(8);
            }else{
            setFormData(inputData);
            setResponse(false);
            setApiData(null);
            setCurrentForm(0);
            setNo_of_com(0);
            setModalOpen(false);
            setSelected_course_category(null);}
      });
  } catch (error) {
    console.error('Error:', error);
    window.alert('Error!');
  }
  };

  const handleSubmit9 = async (data1,data2) => {
    try {
      await Post('sub9',{data1,data2}).then(async sub9=>{
            console.log(sub9.data.data);
            window.alert('Course offered successfully!');
            if(no_of_com>1){
              setFormData({...inputData, selected_course_category: selected_course_category, no_of_ESO:no_of_com});
              setNo_of_com(no_of_com-1);
              setCurrentForm(9);
            }else{
            setFormData(inputData);
            setResponse(false);
            setApiData(null);
            setCurrentForm(0);
            setModalOpen(false);
            setNo_of_com(0);
            setSelected_course_category(null);}
      });
  } catch (error) {
    console.error('Error:', error);
    window.alert('Error!');
  }
  };

  const handleSubmit2 = async (data1,data2) => {
    try {
      await Post('sub2',{data1,data2}).then(async sub2=>{
            console.log(sub2.data.data);
            setFormData(inputData);
            setResponse(false);
            setApiData(null);
            setCurrentForm(0);
            setModalOpen(false);
            setNo_of_com(0);
            setSelected_course_category(null);
            window.alert('Course offered successfully!');
      });
  } catch (error) {
    console.error('Error:', error);
    window.alert('Error!');
  }
  };

  const handleSubmit10 = async (data1,data2) => {
    try {
      await Post('sub10',{data1,data2}).then(async sub10=>{
            console.log(sub10.data.data);
            setFormData(inputData);
            setResponse(false);
            setApiData(null);
            setModalOpen(false);
            setCurrentForm(0);
            setNo_of_com(0);
            setSelected_course_category(null);
            window.alert('Course offered successfully!');
      });
  } catch (error) {
    console.error('Error:', error);
    window.alert('Error!');
  }
  };

  const handleReload = () => {
    window.location.reload(); // Reload the page
    //setFormData(null);
    //setResponse(false);
    //setApiData(null);
    //setCurrentForm(0);
  };

  const showresult = async () => {
    /*setResponse(true);
    setApiData([
      { column1: inputData.session_year, column2: inputData.session },
      { column1: inputData.course, column2: inputData.branch },
      { column1: inputData.semester, column2: inputData.batch },
    ]);*/
    try {
        await Post('coursedata',{formData}).then(async res=>{
              console.log(res.data.data);
              setApiData(res.data.data);
              //setInputData({...inputData, department_id : res.data.data[0].deptId, department_name: res.data.data[0].deptName});
              //setFormData({...formData, department_id : res.data.data[0].deptId, department_name: res.data.data[0].deptName});
              setResponse(true);
        });
    } catch (error) {
      console.error('Error:', error);
      window.alert('Error');
      //setError(error.message);
      
    }
  };

  const handleCourseChange = async (e) => {
    try{
      setInputData({ ...inputData, [e.target.name]: e.target.value , branch:'', department:''});
      setFormData({ ...formData, [e.target.name]: e.target.value, branch:'', department:'' });
      setApiData(null);
      setResponse(false);
      setNo_of_com(0);
      setSelected_course_category(null);
      setModalOpen(false);
      await Post('getbranchee',{course: e.target.value}).then(async bralis=>{
        console.log(bralis.data.data);
        setBrancheelist(bralis.data.data); // Assuming the output is in the "output" key
      });
    } catch (error) {
      console.error('Error:', error);
      //setError(error.message);
      
    }
  };

  const handleBranchChange = async (e) => {
    try{
      setInputData({ ...inputData, [e.target.name]: e.target.value , department:'',section:''});
      setFormData({ ...formData, [e.target.name]: e.target.value , department:'',section:''});
      setApiData(null);
      setResponse(false);
      setModalOpen(false);
      setNo_of_com(0);
      setSelected_course_category(null);
      await Post('getdepartment',{branch: e.target.value, course:formData.course}).then(async deplis=>{
        console.log(deplis.data.data);
        setDepartmentlist(deplis.data.data); // Assuming the output is in the "output" key
      });
    } catch (error) {
      console.error('Error:', error);
      //setError(error.message);
      
    }
  };

  const handleInputChangesem = async (e) => {
    try{
      setInputData({ ...inputData, [e.target.name]: e.target.value , batch:''});
      setFormData({ ...formData, [e.target.name]: e.target.value , batch:''});
      setApiData(null);
      setResponse(false);
      setModalOpen(false);
      setNo_of_com(0);
      setSelected_course_category(null);
      await Post('getbatch',{semester: e.target.value, session_year:formData.session_year, session:formData.session}).then(async batlis=>{
        console.log(batlis.data.data);
        setBatchlist(batlis.data.data); // Assuming the output is in the "output" key
      });
    } catch (error) {
      console.error('Error:', error);
      //setError(error.message);
      
    }
  };

  const handleInputChangesesyr = (e) => {
      setInputData({ ...inputData, [e.target.name]: e.target.value , batch:'', session:'', semester:''});
      setFormData({ ...formData, [e.target.name]: e.target.value , batch:'',  session:'', semester:''});
      setApiData(null);
      setResponse(false);
      setModalOpen(false);
      setNo_of_com(0);
      setSelected_course_category(null);
  };

  const handleInputChangeses = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value , batch:'', semester:''});
    setFormData({ ...formData, [e.target.name]: e.target.value , batch:'', semester:''});
    setApiData(null);
    setResponse(false);
    setModalOpen(false);
    setNo_of_com(0);
    setSelected_course_category(null);
  };

  useEffect(() => {
  const handleInputClick = async () => {
    try{
      await Get('getsessionyear').then(async seslis=>{
        console.log(seslis.data.data);
        setSessionyearlist(seslis.data.data); // Assuming the output is in the "output" key
      });
      await Get('getsession').then(async sesslis=>{
        console.log(sesslis.data.data);
        setSessionlist(sesslis.data.data); // Assuming the output is in the "output" key
      });
      await Get('getcoursee').then(async coulis=>{
        console.log(coulis.data.data);
        setCourseelist(coulis.data.data); // Assuming the output is in the "output" key
      });
    }catch (error) {
      console.error('Error:', error);
    }
  }
  handleInputClick();
}, []);

  const renderForm = () => {
    switch (currentForm) {
      case 0:
        return (
          <div className={styles.container}>
            <button onClick={() => handleReload()}>Reset</button>
            <h2>Semester Course Offer</h2>
            <select name="session_year" value={inputData.session_year} onChange={handleInputChangesesyr} required>
              <option value="">Select Session Year</option>  
              {sessionyearlist.map((row) => (
                <option value={row.session_year}>{row.session_year}</option> 
              ))}
            </select>
            <select name="session" value={inputData.session} onChange={handleInputChangeses} required>
              <option value="">Select Session</option>  
              {sessionlist.map((row) => (
                <option value={row.session}>{row.session}</option> 
              ))}
            </select>
            <select name="course" value={inputData.course} onChange={handleCourseChange} required>
              <option value="">Select Course</option>  
              {courseelist.map((row) => (
                <option value={row.name}>{row.name}</option> 
              ))}
            </select>
            <select name="branch" value={inputData.branch} onChange={handleBranchChange} required>
              <option value="">Select Branch</option>  
              {brancheelist.map((row) => (
                <option value={row.name}>{row.name}</option> 
              ))}
            </select>
            <select name="department" value={inputData.department} onChange={handleInputChange} required>
              <option value="">Select Department</option>  
              {departmentlist.map((row) => (
                <option value={row.name}>{row.name}</option> 
              ))}
            </select>
            <select name="semester" value={inputData.semester} onChange={handleInputChangesem} required>
              <option value="">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
            </select>
            <select name="batch" value={inputData.batch} onChange={handleInputChange} required>
              <option value="">Select Batch</option>
              {batchlist.map((row) => (
                <option value={row.batch}>{row.batch}</option> 
              ))}  
            </select>
            {inputData.branch==='Common Branch for 1st Year' &&(
              <select name="section" value={inputData.section} onChange={handleInputChange} required>
                <option value="">Select Section</option>
                <option value="ABCD">ABCD</option>
                <option value="EFGH">EFGH</option>
              </select>
            )}
            <button onClick={() => showresult()}>Show results</button>
            {response && apiData &&(
              <div>
              <h3>These courses are found...</h3>
              <table>
                <thead>
                  <tr>
                    <th>Course Component</th>
                    <th>Course Category</th>
                    <th>Status</th>
                    <th>Subject Category</th>
                    <th>Subject Code</th>
                    <th>Subject Name</th>
                    <th>Action 1</th>
                    <th>Action 2</th>
                    <th>Action 3</th>
                  </tr>
                </thead>
                <tbody>
                {apiData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.course_component}</td>
                    <td>{row.sequence}</td>
                    <td>{row.status}</td>
                    <td>{row.sub_category}</td>
                    <td>{row.sub_code}</td>
                    <td>{row.sub_name}</td>
                    {row.offer_condition &&(<td><button onClick={() => fetchCourseData(row)}>Show Course</button></td>)}
                    {!row.offer_condition &&(<td></td>)}
                    {!row.offer_condition &&(<td><button onClick={() => handleFormSubmit(row)}>Add Course</button></td>)}
                    {row.offer_condition &&(<td><button onClick={() => handleSubDelete(row)}>Remove Course</button></td>)}
                    {(row.sub_category.startsWith('OE')||row.sub_category.startsWith('DE')||row.sub_category.startsWith('ESO'))&&(
                      <td><button onClick={() => plusCourse(row)}>+</button></td>
                    )}
                    {!(row.sub_category.startsWith('OE')||row.sub_category.startsWith('DE')||row.sub_category.startsWith('ESO'))&&(
                      <td></td>
                    )}
                  </tr>
                ))}
                </tbody>
              </table>
              </div>
            )}
            {response && !apiData && (
              <div>
                No course is found.
              </div>
            )}
            {modalOpen && <Modal onClose={() => setModalOpen(false)} data={modalData} onDelete={modalsub}/>}
          </div>
        );
      case 1:
        return <Form1 formData={formData} onSubmit={handleSubmit1} />;
      case 2:
        return <Form2 formData={formData} onSubmit={handleSubmit2} />;
      case 3:
        return <Form3 formData={formData} onSubmit={handleForm3Submit} />;
      case 4:
        return <Form4 formData={formData} onSubmit={handleForm4Submit} />;
      case 5:
        return <Form5 formData={formData} onSubmit={handleForm5Submit} />;
      case 6:
        return <Form6 formData={formData} onSubmit={handleForm6Submit} />;
      case 7:
        return <Form7 formData={formData} onSubmit={handleSubmit7} />;
      case 8:
        return <Form8 formData={formData} onSubmit={handleSubmit8} />;
      case 9:
        return <Form9 formData={formData} onSubmit={handleSubmit9} />;
      case 10:
        return <Form10 formData={formData} onSubmit={handleSubmit10} />;
      case 11:
        return <Form11 formData={formData} onSubmit={handleSubmit11} />;
      default:
        return (
          <button onClick={() => handleReload()}>Go to Main Page</button>
        );
    }
  };

  return <div>{renderForm()}</div>;
};

export default MainPage;
