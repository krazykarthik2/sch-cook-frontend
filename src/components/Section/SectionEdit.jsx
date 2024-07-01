import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import branch from "../../utils/branch";
import section from "../../utils/section";

const SectionEdit = () => {
  const { branchId, id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [secId, setSecId] = useState("");

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response_data = (await branch.get(branchId)).data.sections.find(
          (e) => e.sec_id == secId
        );
        setName(response_data.name);
        setSecId(response_data.sec_id);
      } catch (error) {
        console.error("Error fetching section:", error);
      }
    };
    fetchSection();
  }, [branchId, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toastThis(
      () => section.edit(branchId, id, { name }),
      () => navigate(`/branch/${branchId}/sections`),
      {
        pending: `Modifying Section ${id} in ${branchId}`,
        error: `Error Modifying Section ${id} in ${branchId}`,
        success: `Section ${id} in ${branchId} modified successfully`,
      }
    );
  };

  return (
    <div>
      <h2>Edit Section</h2>
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

export default SectionEdit;
