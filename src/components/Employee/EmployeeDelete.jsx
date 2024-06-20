// File: src/components/Employee/EmployeeDelete.jsx

import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeDelete = () => {
    const { id } = useParams();
    const navigate =useNavigate()

    const handleDelete = () => {
        axios.delete(`/employee/delete/${id}`)
            .then(() => navigate('/employee/get'))
            .catch(error => console.error('Error deleting employee:', error));
    };

    return (
        <div>
            <h1>Delete Employee</h1>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default EmployeeDelete;
