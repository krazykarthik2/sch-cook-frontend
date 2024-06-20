import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import employee from "../../utils/employee";

const EmployeeEdit = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      employee.edit(id, { name }).then((e) => {
        if (e) navigate("/employee/get");
      });
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
