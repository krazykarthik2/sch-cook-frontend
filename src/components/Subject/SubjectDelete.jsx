// File: src/components/Subject/SubjectDelete.jsx

import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import subject from "../../utils/subject";
import Info from "../utils/Info";
import { toastThis } from "../../utils/fx";
const SubjectDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject__, setSubject__] = useState({});

  const fetchSubject = async () => {
    try {
      const response = await subject.get(id);
      setSubject__(response.data);
    } catch (error) {
      console.error("Error fetching subject:", error);
    }
  };

  const handleDelete = () => {
    toastThis(
      () => subject._delete(id),
      () => navigate(`/subject/get`),
      {
        pending: `Deleting Subject ${id}`,
        error: `Error Deleting Subject ${id}`,
        success: `Subject ${id} deleted successfully `,
      }
    );
  };

  useEffect(() => {
    fetchSubject();
  }, [id]);

  return (
    <div>
      <h1 className="text-3xl">
        Delete Subject: <span className="font-M">{subject__?.name}</span>
      </h1>
      <p className="text-muted">#{subject__.subject_id}</p>
      <div className="absolute bottom-0 p-5 d-center w-full flex-col gap-5">
        <div className="flex flex-col w-full items-start">
          <Info
            content={"Deleting this subject will remove all related data"}
          />
        </div>
        <button className="d-center gap-2" onClick={handleDelete}>
          <FaTrashAlt size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default SubjectDelete;
