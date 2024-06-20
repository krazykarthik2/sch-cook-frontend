import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import branch from '../../utils/branch';

const BranchList = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await branch.getAll()
        setBranches(response.data);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };
    fetchBranches();
  }, []);

  return (
    <div>
      <h2>Branches</h2>
      <ul>
        {branches.map(branch => (
          <li key={branch._id}>
            {branch.name}
            <Link to={`/branch/edit/${branch._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/branch/create">Create Branch</Link>
    </div>
  );
};

export default BranchList;
