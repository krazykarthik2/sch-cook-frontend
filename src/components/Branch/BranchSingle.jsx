// File: src/components/Branch/BranchSingle.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BranchSingle = () => {
    const { id } = useParams();
    const [branch, setBranch] = useState(null);

    useEffect(() => {
        axios.get(`/branch/get/${id}`)
            .then(response => setBranch(response.data))
            .catch(error => console.error('Error fetching branch:', error));
    }, [id]);

    if (!branch) return <div>Loading...</div>;

    return (
        <div>
            <h1>{branch.name}</h1>
            <p>ID: {branch.id}</p>
            <p>Sections: {JSON.stringify(branch.sections)}</p>
        </div>
    );
};

export default BranchSingle;
