import React, { useState } from "react";
import { useParams } from "react-router-dom";
import section from "../../utils/section";
import {toastThis} from "../../utils/fx"
const SectionCreate = () => {
  const branchId = useParams()["branch_id"];
  const [name, setName] = useState("");
  const [secId, setSecId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toastThis(
        () => section.create(branchId, { name, sec_id: secId }),
        () => {
          setName("");
          setSecId("");
        },
        {
          pending: `Creating Section ${secId} in ${branchId}`,
          error: `Error Creating Section ${secId} in ${branchId}`,
          success: `Section ${secId} Created Successfully in ${branchId} `,
        }
      );
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };

  return (
    <div>
      <h2>Create Section</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={secId}
          onChange={(e) => setSecId(e.target.value)}
          placeholder="Section ID"
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

export default SectionCreate;
