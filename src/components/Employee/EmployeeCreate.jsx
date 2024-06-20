import React, { useState } from "react";
import axios from "axios";
import employee from "../../utils/employee";

const EmployeeCreate = () => {
  const [name, setName] = useState("");
  const [emp_id, setEmpId] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await employee.create({ name, emp_id });
      setName("");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setEmpId(e.target.value)}
          placeholder="employee id"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EmployeeCreate;
