// File: src/components/Employee/EmployeeDelete.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import employee from "../../utils/employee";
import { toastThis } from "../../utils/fx";
const EmployeeDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await employee.get(id);
        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleDelete = () => {
    toastThis(
      () => employee._delete(id),
      () => navigate("/employee/get"),
      {
        pending: `Deleting ${id}`,
        error: `Error deleting ${id}`,
        success: `${id} deleted successfully`,
      }
    );
  };

  return (
    <div>
      <h1 className="text-4xl">Delete Employee</h1>
      <h2 className="text-2xl">
        id:<p className="text-3xl text-gray-700">{id}</p>
      </h2>
      <h2 className="text-2xl">
        name:<p className="text-3xl">{name}</p>
      </h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EmployeeDelete;
