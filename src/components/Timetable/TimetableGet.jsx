// File: src/components/Section/TimetableGet.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"

const TimetableGet = () => {
    const { branch_id, section_id } = useParams();
    const [timetable, setTimetable] = useState(null);

    useEffect(() => {
        axios.get(`/branch/${branch_id}/section/${section_id}/timetable/get`)
            .then(response => setTimetable(response.data))
            .catch(error => console.error('Error fetching timetable:', error));
    }, [branch_id, section_id]);

    if (!timetable) return <div>Loading...</div>;

    return (
        <div>
            <h1>Timetable</h1>
            <pre>{JSON.stringify(timetable, null, 2)}</pre>
        </div>
    );
};

export default TimetableGet;
