import React, { useEffect, useState } from "react";
import branchcode from "../../utils/branchcode";
import { useNavigate, useParams } from "react-router-dom";
import { toastThis } from "../../utils/fx";

const BranchcodeEdit = () => {
  const branch_code = useParams()["branch_code"];
  const [branchCode, setBranchCode] = useState([]);
  const [editedName, setEditedName] = useState("");
const navigate = useNavigate()
  useEffect(() => {
    branchcode.get(branch_code).then((result) => {
      setBranchCode(result.data);
      setEditedName(result.data.name);
    });
  }, [branch_code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toastThis(()=>branchcode.edit(branch_code, { name: editedName }),()=>navigate("/branchcode/get/"),{
      pending:`Modifying BranchCode ${branchCode}`,
      error:`Error modifying BranchCode ${branchCode}`,
      success:`BranchCode ${branchCode} created successfully`
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{branchCode._id}</div>
      <div>
        <div>Branch Code:</div>
        <div>{branchCode.branch_code}</div>
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default BranchcodeEdit;
