import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import branchcode from "../../utils/branchcode";
import { toastThis } from "../../utils/fx";

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
    toastThis(()=>branchcode._delete(branch_code),()=>
    navigate("/branchcode/get"),{
      pending:`Deleting BranchCode ${branchCode}`,
      error:`Error deleting BranchCode ${branchCode}`,
      success:`BranchCode ${branchCode} deleted successfully`
    })
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
