import React, { useState } from "react";
import employee from "../../utils/employee";

import { ToastContainer, toast } from "react-toastify";
const EmployeeCreate = () => {
  const [name, setName] = useState("");
  const [emp_id, setEmpId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emp_id && name) {
      toast.promise(employee.create({ name, emp_id }), {
        pending: `Creating ${name} as ${emp_id}`,
        error: `Error creating employee`,
        success: `Employee Created Successfully`,
      });
      setEmpId("");
      setName("");
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
          onChange={(e) =>
            setEmpId(e.target.value.toUpperCase().split(" ").join(""))
          }
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
