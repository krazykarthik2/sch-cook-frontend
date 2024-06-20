// File: src/components/Subject/SubjectDelete.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubjectDelete = () => {
    const { id } = useParams();
    const navigate =useNavigate()

    const handleDelete = () => {
        axios.delete(`/subject/delete/${id}`)
            .then(() => navigate('/subject/get'))
            .catch(error => console.error('Error deleting subject:', error));
    };

    return (
        <div>
            <h1>Delete Subject</h1>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default SubjectDelete;
