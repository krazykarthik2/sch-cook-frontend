// File: src/components/EmpRelation/EmpRelationEdit.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmpRelationEdit = () => {
    const { id } = useParams();
    const navigate =useNavigate()
    const [relation, setRelation] = useState({
        emp_id: '',
        branch_id: '',
        sec_id: '',
        subject_id: ''
    });

    useEffect(() => {
        axios.get(`/relation/get/${id}`)
            .then(response => setRelation(response.data))
            .catch(error => console.error('Error fetching relation:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRelation(prevRelation => ({ ...prevRelation, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/relation/edit/${id}`, relation)
            .then(() => navigate('/relation/get'))
            .catch(error => console.error('Error updating relation:', error));
    };

    return (
        <div>
            <h1>Edit Employee Relation</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        name="emp_id"
                        value={relation.emp_id}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Branch ID:</label>
                    <input
                        type="text"
                        name="branch_id"
                        value={relation.branch_id}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Section ID:</label>
                    <input
                        type="text"
                        name="sec_id"
                        value={relation.sec_id}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Subject ID:</label>
                    <input
                        type="text"
                        name="subject_id"
                        value={relation.subject_id}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EmpRelationEdit;
