import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import branchcode from "../../utils/branchcode";
import { toastThis } from "../../utils/fx";
const BranchcodeCreate = ({}) => {
  const [branchCode, setBranchCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [searchP, setSearchP] = useSearchParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toastThis(
      () => branchcode.create({ branch_code: branchCode, name: name }),
      () => {
        setBranchCode("");
        setName("");
        navigate(searchP.get("continue") || "/branchcode/get");
      },
      {
        pending: `Creating BranchCode ${branchCode}`,
        error: `Error creating branchcode ${branchCode}`,
        success: `BranchCode ${branchCode} created successfully`,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Branch Code:</label>
        <input
          type="text"
          value={branchCode}
          onChange={(e) => setBranchCode(e.target.value)}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BranchcodeCreate;
