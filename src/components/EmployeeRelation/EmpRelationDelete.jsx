// File: src/components/EmpRelation/EmpRelationDelete.jsx

import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmpRelationDelete = () => {
    const { id } = useParams();
    const navigate =useNavigate()

    const handleDelete = () => {
        axios.delete(`/relation/delete/${id}`)
            .then(() => navigate('/relation/get'))
            .catch(error => console.error('Error deleting employee relation:', error));
    };

    return (
        <div>
            <h1>Delete Employee Relation</h1>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default EmpRelationDelete;
