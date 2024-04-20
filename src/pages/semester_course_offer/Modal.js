import React from 'react';
import styles from './styling/styles.module.css';
import { Post, Get } from 'src/configs/Reqmethod';



const Modal = ({ onClose, data, onDelete }) => {
    const handleSub1Delete = async (row) => {
        //setFormData({ ...formData, course_component: row.course_component, course_category: row.sequence});
        //setInputData({ ...inputData, course_component: row.course_component, course_category: row.sequence});
        try {
          const isConfirmed = window.confirm('Are you sure you want to delete the course?');
          if(isConfirmed){await Post('sub1delete',{id:row.id}).then(async sub1del=>{
                console.log(sub1del.data.data);
                onDelete();
                window.alert('Course deleted successfully!');
          });}
      } catch (error) {
        console.error('Error:', error);
        window.alert('Error!');
      }
    };

  return (
    <div className={styles.container}>
        <button onClick={onClose}>Close</button>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Subject Category</th>
                        <th>Subject Name</th>
                        <th>Subject Code</th>
                        <th>Lecture</th>
                        <th>Tutorial</th>
                        <th>Practical</th>
                        <th>Credit Hours</th>
                        <th>Contact Hours</th>
                        <th>Subject Type</th>
                        <th>Action 1</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row.sub_category}</td>
                        <td>{row.sub_name}</td>
                        <td>{row.sub_code}</td>
                        <td>{row.lecture}</td>
                        <td>{row.tutorial}</td>
                        <td>{row.practical}</td>
                        <td>{row.credit_hours}</td>
                        <td>{row.contact_hours}</td>
                        <td>{row.sub_type}</td>
                        <td><button onClick={() => handleSub1Delete(row)}>-</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Modal;
