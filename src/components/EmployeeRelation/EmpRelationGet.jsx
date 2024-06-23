// File: src/components/EmployeeRelation/EmpRelationGet.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import emprelation from "../../utils/emprelation";

function EmpRelationRow({ relation }) {
  return (
    <tr key={relation._id}>
      <td>{relation.emp_id}</td>
      <td>{relation.branch_id}</td>
      <td>{relation.sec_id}</td>
      <td>{relation.subject_id}</td>
      <td>
        <Link className="d-center" to={`/relation/get/${relation._id}`}>
          <FaEye size={24} />
        </Link>
      </td>
      <td>
        <Link className="d-center" to={`/relation/edit/${relation._id}`}>
          <FaEdit size={24} />
        </Link>
      </td>
      <td>
        <Link className="d-center" to={`/relation/delete/${relation._id}`}>
          <FaTrash size={24} />
        </Link>
      </td>
    </tr>
  );
}

const EmpRelationGet = () => {
  const [relations, setRelations] = useState([]);

  useEffect(() => {
    const fetchRelations = async () => {
      try {
        const response = await emprelation.getAll()
        setRelations(response.data);
      } catch (error) {
        console.error("Error fetching employee relations:", error);
      }
    };

    fetchRelations();
  }, []);

  return (
    <div className="h-full w-full p-5">
      <h2>Employee Relations</h2>
      <table className="w-full h-full">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Branch ID</th>
            <th>Section ID</th>
            <th>Subject ID</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {relations.map((relation) => (
            <EmpRelationRow key={relation._id} relation={relation} />
          ))}
        </tbody>
      </table>
      <div className="absolute m-5 bottom-0 right-0">
        <Link
          to="/relation/create"
          className="btn w-min flex flex-col items-center justify-center"
        >
          <FaPlus size="45" />
          <div className="hidden sm:flex">Create Relation</div>
        </Link>
      </div>
    </div>
  );
};

export default EmpRelationGet;
