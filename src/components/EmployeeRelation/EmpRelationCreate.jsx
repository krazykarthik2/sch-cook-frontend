import React, { useState } from 'react';
import axios from 'axios';
import emprelation from '../../utils/emprelation';

const EmpRelationCreate = () => {
  const [empId, setEmpId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [secId, setSecId] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emprelation.create({ emp_id: empId, branch_id: branchId, sec_id: secId, subject_id: subjectId });
      setEmpId('');
      setBranchId('');
      setSecId('');
      setSubjectId('');
    } catch (error) {
      console.error('Error creating relation:', error);
    }
  };

  return (
    <div>
      <h2>Create Employee Relation</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={empId} 
          onChange={(e) => setEmpId(e.target.value)} 
          placeholder="Employee ID" 
        />
        <input 
          type="text" 
          value={branchId} 
          onChange={(e) => setBranchId(e.target.value)} 
          placeholder="Branch ID" 
        />
        <input 
          type="text" 
          value={secId} 
          onChange={(e) => setSecId(e.target.value)} 
          placeholder="Section ID" 
        />
        <input 
          type="text" 
          value={subjectId} 
          onChange={(e) => setSubjectId(e.target.value)} 
          placeholder="Subject ID" 
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EmpRelationCreate;
