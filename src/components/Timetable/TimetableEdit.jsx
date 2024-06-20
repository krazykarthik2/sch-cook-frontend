// File: src/components/Section/TimetableEdit.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TimetableEdit = () => {
    const { branch_id, section_id } = useParams();
    const navigate =useNavigate()
    const [timetable, setTimetable] = useState({});

    useEffect(() => {
        axios.get(`/branch/${branch_id}/section/${section_id}/timetable/get`)
            .then(response => setTimetable(response.data))
            .catch(error => console.error('Error fetching timetable:', error));
    }, [branch_id, section_id]);

    const handleChange = (day, index, value) => {
        setTimetable(prevTimetable => {
            const updatedDay = [...prevTimetable[day]];
            updatedDay[index] = value;
            return { ...prevTimetable, [day]: updatedDay };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`/branch/${branch_id}/section/${section_id}/timetable/edit`, { timetable })
            .then(() => navigate(`/branch/${branch_id}/section/${section_id}/timetable/get`))
            .catch(error => console.error('Error updating timetable:', error));
    };

    return (
        <div>
            <h1>Edit Timetable</h1>
            <form onSubmit={handleSubmit}>
                {Object.keys(timetable).map(day => (
                    <div key={day}>
                        <h2>{day}</h2>
                        {timetable[day].map((period, index) => (
                            <div key={index}>
                                <label>Period {index + 1}:</label>
                                <input
                                    type="text"
                                    value={period}
                                    onChange={(e) => handleChange(day, index, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default TimetableEdit;
