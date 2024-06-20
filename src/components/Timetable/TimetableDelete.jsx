// File: src/components/Section/TimetableDelete.jsx

import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TimetableDelete = () => {
    const { branch_id, section_id } = useParams();
    const navigate =useNavigate()

    const handleDelete = () => {
        axios.delete(`/branch/${branch_id}/section/${section_id}/timetable/delete`)
            .then(() =>navigate(`/branch/${branch_id}`))
            .catch(error => console.error('Error deleting timetable:', error));
    };

    return (
        <div>
            <h1>Delete Timetable</h1>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default TimetableDelete;
