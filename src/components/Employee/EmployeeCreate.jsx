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
      setEmpId("");
      setName("");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-3 p-5 card m-5"
      >
        <h2 className="title">Create Employee</h2>
        <label htmlFor="id" className="font-I">
          Employee id
        </label>
        <input
          id="id"
          type="text"
          value={emp_id}
          onChange={(e) => setEmpId(e.target.value)}
          placeholder="employee id"
        />
        <label htmlFor="name" className="font-I">
          Employee Name
        </label>
        <input
          id="name"
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
