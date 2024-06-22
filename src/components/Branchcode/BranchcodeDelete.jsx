import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import branchcode from "../../utils/branchcode";

const BranchcodeDelete = () => {
  const branch_code = useParams()["branch_code"];
  const navigate = useNavigate();
  const [branchCode,setBranchCode] = useState({});
  useEffect(()=>{
      branchcode.get(branch_code).then(result=>{
          setBranchCode(result.data);
      })
  },[branch_code])
  

  const handleDelete = async () => {
    await branchcode._delete(branch_code);
    navigate("/branchcode/get");
  };

  return (
    <div>
      <h3>
        {branchCode.name} ({branchCode.branch_code})
      </h3>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default BranchcodeDelete;
