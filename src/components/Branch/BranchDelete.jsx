// File: src/components/Branch/BranchDelete.jsx

import React from 'react';
import { useParams,  useNavigate } from 'react-router-dom';
import axios from 'axios';

const BranchDelete = () => {
    const { id } = useParams();
    const navigate =useNavigate()

    const handleDelete = () => {
        axios.delete(`/branch/delete/${id}`)
            .then(() => navigate('/branch/get'))
            .catch(error => console.error('Error deleting branch:', error));
    };

    return (
        <div>
            <h1>Delete Branch</h1>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default BranchDelete;
