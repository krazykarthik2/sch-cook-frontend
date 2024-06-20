// File: src/components/Section/SectionDelete.jsx

import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SectionDelete = () => {
    const { branch_id, id } = useParams();
    const navigate =useNavigate()

    const handleDelete = () => {
        axios.delete(`/branch/${branch_id}/section/delete/${id}`)
            .then(() =>navigate(`/branch/get/${branch_id}`))
            .catch(error => console.error('Error deleting section:', error));
    };

    return (
        <div>
            <h1>Delete Section</h1>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default SectionDelete;
