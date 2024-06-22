// File: src/components/Branch/BranchSingle.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import branch from "../../utils/branch";
import SectionCard from "../Section/SectionCard";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
const BranchSingle = () => {
  const branch_id = useParams()["id"];

  const [branch_, setBranch_] = useState({});
  window.branch_ = branch_;
  const fetchBranch = async (e) => {
    try {
      const response = await branch.get(branch_id);
      setBranch_(response.data);
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  return (
    <div>
      <h1 className="text-3xl">Branch :{branch_?.branch_id}</h1>
      <h1 className="text-3xl">Year :{branch_?.year}</h1>
      <h1 className="text-3xl">BranchCode :{branch_?.branch_code}</h1>
      <div className="card m-5 relative">
        <h1 className="text-3xl">Sections :</h1>
        <div className="sections flex flex-wrap">
          {branch_?.sections?.map((e, i) => (
            <SectionCard section={e} branch_id={branch_.branch_id} key={i} />
          ))}
        </div>
        <div className="absolute bottom-0 right-0">
          <Link
            className="d-center btn rounded h-16 w-16 m-5"
            to={`/branch/${branch_.branch_id}/section/create`}
          >
            <FaPlus size={24} />
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 p-5 d-center w-full">
      <Link
            className="d-center btn rounded h-16 w-16 m-5"
            to={`/branch/edit/${branch_.branch_id}`}
          >
            <FaEdit size={24} />
          </Link><Link
            className="d-center btn rounded h-16 w-16 m-5"
            to={`/branch/delete/${branch_.branch_id}/`}
          >
            <FaTrashAlt size={24} />
          </Link>
      </div>
    </div>
  );
};

export default BranchSingle;
