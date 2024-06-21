import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import subject from "../../utils/subject";

// Component to render a single subject row
function SubjectRow({ subject }) {
  return (
    <tr key={subject._id}>
      <td>{subject.subject_id}</td>
      <td>{subject.name}</td>
      <td>
        <Link className="d-center" to={`/subject/get/${subject.subject_id}`}>
          <FaEye size={24} />
        </Link>
      </td>
      <td>
        <Link className="d-center" to={`/subject/edit/${subject.subject_id}`}>
          <FaEdit size={24} />
        </Link>
      </td>
      <td>
        <Link className="d-center" to={`/subject/delete/${subject.subject_id}`}>
          <FaTrash size={24} />
        </Link>
      </td>
    </tr>
  );
}

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await subject.getAll();
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="h-full w-full p-5">
      <h2>Subjects</h2>
      <table className="w-full h-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <SubjectRow key={subject._id} subject={subject} />
          ))}
        </tbody>
      </table>
      <div className="absolute m-5 bottom-0 right-0">
        <Link
          to="/subject/create"
          className="btn w-min flex flex-col items-center justify-center"
        >
          <FaPlus size="45" />
          <div className="hidden sm:flex">Create Subject</div>
        </Link>
      </div>
    </div>
  );
};

export default SubjectList;
