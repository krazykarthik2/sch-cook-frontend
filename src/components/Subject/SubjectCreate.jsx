import React, { useState } from "react";
import axios from "axios";
import subject from "../../utils/subject";
import { toastThis } from "../../utils/fx";

const SubjectCreate = () => {
  const [subjectId, setSubjectId] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    toastThis(
      () => subject.create({ subject_id: subjectId, name: subjectName }),
      () => {
        setSubjectId("");
        setSubjectName("");
      },
      {
        pending: `Creating Subject ${subjectId}`,
        error: `Error Creating Subject ${subjectId}`,
        success: `Subject ${subjectId} created successfully `,
      }
    );
  };

  return (
    <div>
      <h2>Create Subject</h2>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default SubjectCreate;
