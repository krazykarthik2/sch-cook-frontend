// File: src/components/EmployeeRelation/EmpRelationSingle.jsx

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import emprelation from "../../utils/emprelation"
const EmpRelationSingle = () => {
  const { id } = useParams();
  const [relation__, setRelation__] = useState({});

  const fetchRelation = async () => {
    try {
      const response = await emprelation.get(id);
      setRelation__(response.data);
    } catch (error) {
      console.error("Error fetching employee relation:", error);
    }
  };

  useEffect(() => {
    fetchRelation();
  }, [id]);

  return (
    <div>
      <h1 className="text-3xl">Employee Relation</h1>
      <p>Employee ID: {relation__.emp_id}</p>
      <p>Branch ID: {relation__.branch_id}</p>
      <p>Section ID: {relation__.sec_id}</p>
      <p>Subject ID: {relation__.subject_id}</p>
      <div className="absolute bottom-0 p-5 d-center w-full">
        <Link
          className="d-center btn rounded h-16 w-16 m-5"
          to={`/relation/edit/${relation__._id}`}
        >
          <FaEdit size={24} />
        </Link>
        <Link
          className="d-center btn rounded h-16 w-16 m-5"
          to={`/relation/delete/${relation__._id}`}
        >
          <FaTrashAlt size={24} />
        </Link>
      </div>
    </div>
  );
};

export default EmpRelationSingle;
