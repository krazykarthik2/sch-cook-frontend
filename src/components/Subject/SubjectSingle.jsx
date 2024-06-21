// File: src/components/Subject/SubjectSingle.jsx

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import subject from "../../utils/subject";
const SubjectSingle = () => {
  const { id } = useParams();
  const [subject__, setSubject__] = useState({});

  const fetchSubject = async () => {
    try {
      const response = await subject.get(id);
      setSubject__(response.data);
    } catch (error) {
      console.error("Error fetching subject:", error);
    }
  };

  useEffect(() => {
    fetchSubject();
  }, [id]);

  return (
    <div>
      <h1 className="text-3xl">Subject ID: {subject__?.subject_id}</h1>
      <h1 className="text-3xl">Subject Name: {subject__?.name}</h1>

      <div className="absolute bottom-0 p-5 d-center w-full">
        <Link
          className="d-center btn rounded h-16 w-16 m-5"
          to={`/subject/edit/${subject__.subject_id}`}
        >
          <FaEdit size={24} />
        </Link>
        <Link
          className="d-center btn rounded h-16 w-16 m-5"
          to={`/subject/delete/${subject__.subject_id}`}
        >
          <FaTrashAlt size={24} />
        </Link>
      </div>
    </div>
  );
};

export default SubjectSingle;
