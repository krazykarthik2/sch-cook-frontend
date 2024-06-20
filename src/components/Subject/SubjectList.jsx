import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import subject from '../../utils/subject';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await subject.getAll()
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div>
      <h2>Subjects</h2>
      <ul>
        {subjects.map(subject => (
          <li key={subject._id}>
            {subject.subject_name}
            <Link to={`/subject/edit/${subject._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/subject/create">Create Subject</Link>
    </div>
  );
};

export default SubjectList;
