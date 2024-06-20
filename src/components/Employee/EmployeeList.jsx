import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import employee from "../../utils/employee";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await employee.getAll()
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1 className="text-2xl">EMPLOYEE.LIST</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name}
            <Link to={`/employee/edit/${employee.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <div className="absolute m-5 bottom-0 right-0">
        <Link to="/employee/create" className="btn w-min flex flex-col items-center justify-center">
          <FaPlus size="45" />
          <div className="hidden sm:flex">Create Employee</div>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeList;
