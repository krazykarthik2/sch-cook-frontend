import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import subject from "../../utils/subject";

const SubjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await subject.get(id);
        setSubjectName(response.data.name);
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    };
    fetchSubject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await subject.edit(id, { name: subjectName });
      navigate("/subject/get");
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
