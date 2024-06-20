import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import section from '../../utils/section';

const SectionCreate = () => {
  const { branchId } = useParams();
  const [name, setName] = useState('');
  const [secId, setSecId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await section.create(branchId, { name, sec_id: secId });
      setName('');
      setSecId('');
    } catch (error) {
      console.error('Error creating section:', error);
    }
  };

  return (
    <div>
      <h2>Create Section</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={secId} 
          onChange={(e) => setSecId(e.target.value)} 
          placeholder="Section ID" 
        />
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default SectionCreate;
