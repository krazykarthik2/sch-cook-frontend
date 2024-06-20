import React, { useState } from 'react';
import branchcode from '../../utils/branchcode';

const BranchcodeCreate = ({  }) => {
  const [branchCode, setBranchCode] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await branchcode.create({ branch_code: branchCode, name:name });
    setBranchCode('');
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Branch Code:</label>
        <input 
          type="text" 
          value={branchCode} 
          onChange={(e) => setBranchCode(e.target.value)} 
        />
      </div>
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BranchcodeCreate;
