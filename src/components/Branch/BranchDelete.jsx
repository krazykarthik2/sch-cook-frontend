// File: src/components/Branch/BranchDelete.jsx

import React, { useEffect, useState } from "react";
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import branch from "../../utils/branch";
import Info from "../utils/Info";

const BranchDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [branch_, setBranch_] = useState({});

  const fetchBranch = async () => {
    try {
      const response = await branch.get(id);
      setBranch_(response.data);
    } catch (error) {
      console.error("Error fetching branch:", error);
    }
  };

  const handleDelete = () => {
    branch
      ._delete(id)
      .then(() => navigate(`/branch/list`))
      .catch((error) => console.error("Error deleting branch:", error));
  };

  useEffect(() => {
    fetchBranch();
  }, [id]);

  return (
    <div>
      <h1 className="text-3xl">Delete Branch: {branch_.name}</h1>
      <p className="text-muted">#{branch_.branch_id}</p>
      <div className="absolute bottom-0 p-5 d-center w-full flex-col gap-5">
        <div className="flex flex-col w-full items-start">
          <Info content={"Deleting this branch will remove all related data"} />
          <Info content={"Please clean up relations after deleting branch"} />
        </div>
        <button className="d-center gap-2" onClick={handleDelete}>
          <FaTrashAlt size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default BranchDelete;
