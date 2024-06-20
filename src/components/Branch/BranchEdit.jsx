import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory, useNavigate } from "react-router-dom";
import branch from "../../utils/branch";

const BranchEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [branchId, setBranchId] = useState("");

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await branch.get(id);
        setName(response.data.name);
        setBranchId(response.data.branch_id);
      } catch (error) {
        console.error("Error fetching branch:", error);
      }
    };
    fetchBranch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await branch.edit(id, { name, branch_id: branchId });
      navigate("/branches");
    } catch (error) {
      console.error("Error editing branch:", error);
    }
  };

  return (
    <div>
      <h2>Edit Branch</h2>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BranchEdit;
