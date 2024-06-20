import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaStopwatch } from "react-icons/fa";
import employee from "../../utils/employee";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await employee.getAll();
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
      <div className="w-full p-5">
        <table className="w-full ">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Schedule</th>
          </tr>
          {employees.map((employee, ind) => (
            <tr key={ind} className=" font-M">
              <td>{employee.emp_id}</td>
              <td>{employee.name}</td>
              <td>
                <Link
                  className="d-center"
                  to={`/employee/edit/${employee.emp_id}`}
                >
                  <FaEdit size={32} />
                </Link>
              </td>
              <td>
                <Link
                  className="d-center"
                  to={`/employee/timetable/get/${employee.emp_id}`}
                >
                  <FaStopwatch size={32} />
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="absolute m-5 bottom-0 right-0">
        <Link
          to="/employee/create"
          className="btn w-min flex flex-col items-center justify-center"
        >
          <FaPlus size="45" />
          <div className="hidden sm:flex">Create Employee</div>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeList;
