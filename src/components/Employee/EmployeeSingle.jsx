// File: src/components/Employee/EmployeeSingle.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeSingle = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        axios.get(`/employee/get/${id}`)
            .then(response => setEmployee(response.data))
            .catch(error => console.error('Error fetching employee:', error));
    }, [id]);

    if (!employee) return <div>Loading...</div>;

    return (
        <div>
            <h1>{employee.name}</h1>
            <p>ID: {employee.id}</p>
            <p>Timetable: {JSON.stringify(employee.timetable)}</p>
        </div>
    );
};

export default EmployeeSingle;
