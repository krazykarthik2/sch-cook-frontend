import React, { useEffect, useState } from "react";
import BranchcodeEdit from "./BranchcodeEdit";
import { useParams } from "react-router-dom";
import branchcode from "../../utils/branchcode";

const BranchcodeSingle = () => {
    const branch_code = useParams()["branch_code"];
    const [branchCode,setBranchCode] = useState({});
    useEffect(()=>{
        branchcode.get(branch_code).then(result=>{
            console.log(result)
            setBranchCode(result.data);
        })
    },[branch_code])
  return (
    <div>
      <div>
        <h1>{branchCode?.name}</h1>
        <h2>{branchCode?.branch_code}</h2>
      </div>
    </div>
  );
};

export default BranchcodeSingle;
