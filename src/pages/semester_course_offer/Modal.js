import React from 'react';

const Modal = ({ onClose, data }) => {
  return (
    <div>
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
                        <th>Subject Type</th>
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
                        <td>{row.sub_type}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Modal;
