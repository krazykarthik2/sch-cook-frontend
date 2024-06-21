// File: src/components/Employee/EmployeeSingle.jsx

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import employee from "../../utils/employee";
import { FaEdit, FaStopwatch, FaTrash } from "react-icons/fa";
const EmployeeSingle = () => {
  const { id } = useParams();
  const [employee__, setEmployee] = useState(null);

  useEffect(() => {
    employee
      .get(id)
      .then((response) => setEmployee(response.data))
      .catch((error) => console.error("Error fetching employee:", error));
  }, [id]);

  if (!employee__) return <div>Loading...</div>;

  return (
    <div className="text-3xl h-screen d-center flex-col justify-between p-4">
      <div className="details flex flex-col gap-2">
        <div className="flex">
          <h1>Name:</h1>
          <h1 className="font-M">{employee__.name}</h1>
        </div>
        <div className=" flex">
          <h1>ID:</h1>
          <p>{employee__.emp_id}</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Link className="btn" to={`/employee/edit/${employee__.emp_id}`}>
          <FaEdit size={32} />
        </Link>
        <Link className="btn" to={`/employee/delete/${employee__.emp_id}`}>
          <FaTrash size={32} />
        </Link>
        <Link className="btn" to={`/employee/timetable/get/${employee__.emp_id}`}>
          <FaStopwatch size={32} />
        </Link>
      </div>
    </div>
  );
};

export default EmployeeSingle;
