// File: src/components/Section/SectionDelete.jsx

import React, { useEffect, useState } from "react";
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import branch from "../../utils/branch";
import section from "../../utils/section";
import Info from "../utils/Info";
const SectionDelete = () => {
  const params = useParams();
  const branch_id = params["branch_id"];
  const section_id = params["section_id"];

  const navigate = useNavigate();

  const handleDelete = () => {
    section
      ._delete(branch_id, section_id)
      .then(() => navigate(`/branch/get/${branch_id}`))
      .catch((error) => console.error("Error deleting section:", error));
  };
  const [branch_, setBranch_] = useState({});
  const [section_, setSection_] = useState({});
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
  }, [params]);

  useEffect(() => {
    setSection_(branch_?.sections?.find((e) => e.sec_id == section_id));
  }, [branch_]);
  return (
    <div>
      <h1 className="text-3xl">Delete Section: {section_?.name}</h1>
      <p className="text-muted">#{section_id}</p>
      <div className="absolute bottom-0 p-5 d-center w-full flex-col gap-5">
        <div className="flex flex-col w-full items-start">
          <Info content={"Timetable for this section will be deleted too"} />
          <Info content={"Please clean up relations after deleting sections"} />
        </div>
        <button className="d-center gap-2" onClick={handleDelete}>
          <FaTrashAlt size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default SectionDelete;
