import axios from "axios";
import React, { useState } from "react";
import branch from "../../utils/branch";
const BranchCreate = () => {
  const [name, setName] = useState("");
  const [branchId, setBranchId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await branch.create({ name, branch_id: branchId });
      setName("");
      setBranchId("");
    } catch (error) {
      console.error("Error creating branch:", error);
    }
  };

  return (
    <div>
      <h2>Create Branch</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={branchId}
          onChange={(e) => setBranchId(e.target.value)}
          placeholder="Branch ID"
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

export default BranchCreate;
