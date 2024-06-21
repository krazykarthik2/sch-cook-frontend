import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import branch from "../../utils/branch";
import { FaPlus } from "react-icons/fa";
import SectionCard from "./SectionCard";
function SectionsGet() {
  const branchId = useParams()["branch_id"];
  const [branch_, setBranch_] = useState({});
  const fetchBranch = async (e) => {
    try {
      const response = await branch.get(branchId);
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
      <h2>Sections of {branch_.branch_id}</h2>
      <div className="flex flex-wrap gap-2">
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
  );
}

export default SectionsGet;
