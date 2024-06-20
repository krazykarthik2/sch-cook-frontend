import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import subject from "../../utils/subject";

const SubjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subjectId, setSubjectId] = useState("");
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await subject.get(id);
        setSubjectId(response.data.subject_id);
        setSubjectName(response.data.subject_name);
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    };
    fetchSubject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await subject.edit(id, { subject_name: subjectName });
      navigate("/subjects");
    } catch (error) {
      console.error("Error editing subject:", error);
    }
  };

  return (
    <div>
      <h2>Edit Subject</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          placeholder="Subject ID"
        />
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="Subject Name"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SubjectEdit;
