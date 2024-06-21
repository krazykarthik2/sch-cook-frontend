import React, { useState } from 'react';
import axios from 'axios';
import subject from '../../utils/subject';

const SubjectCreate = () => {
  const [subjectId, setSubjectId] = useState('');
  const [subjectName, setSubjectName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await subject.create({ subject_id: subjectId, name: subjectName });
      setSubjectId('');
      setSubjectName('');
    } catch (error) {
      console.error('Error creating subject:', error);
    }
  };

  return (
    <div>
      <h2>Create Subject</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={subjectId} 
          onChange={(e) => setSubjectId(e.target.value)} 
          placeholder="Subject ID" 
        />
        <input 
          type="text" 
          value={subjectName} 
          onChange={(e) => setSubjectName(e.target.value)} 
          placeholder="Subject Name" 
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default SubjectCreate;
