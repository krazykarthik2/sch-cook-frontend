// File: src/components/Section/TimetableDelete.jsx

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import timetable from "../../utils/timetable";
import {toastThis } from "../../utils/fx"
const TimetableDelete = () => {
  const { branch_id, section_id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    toastThis(
      () => timetable._delete(branch_id, section_id),
      () => navigate(`/branch/${branch_id}`),
      {
        pending: `Deleting Timetable of ${section_id} in ${branch_id}`,
        error: `Error Deleting Timetable of ${section_id} in ${branch_id}`,
        success: `Timetable of ${section_id} in ${branch_id} is deleted successfully`,
      }
    );
  };

  return (
    <div>
      <h1>Delete Timetable</h1>
      <h3>of</h3>
      <h2>{section_id} in </h2>
      <h2>{branch_id}</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TimetableDelete;
