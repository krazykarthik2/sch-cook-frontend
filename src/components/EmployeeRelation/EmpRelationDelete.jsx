// File: src/components/EmpRelation/EmpRelationDelete.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import emprelation from "../../utils/emprelation";
import { FaTrashAlt } from "react-icons/fa";

const EmpRelationDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [relation__, setRelation__] = useState({});

  const handleDelete = () => {
    emprelation
      ._delete(id)
      .then(() => navigate("/relation/get"))
      .catch((error) =>
        console.error("Error deleting employee relation:", error)
      );
  };
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
      <p>Employee ID: {relation__?.emp_id}</p>
      <p>Branch ID: {relation__?.branch_id}</p>
      <p>Section ID: {relation__?.sec_id}</p>
      <p>Subject ID: {relation__?.subject_id}</p>
      <div className="absolute bottom-0 p-5 d-center w-full">
        <button
          className="d-center btn rounded h-16 gap-4 m-5"
          onClick={handleDelete}
        >
          <FaTrashAlt size={24} /> DELETE
        </button>
      </div>
    </div>
  );
};

export default EmpRelationDelete;
