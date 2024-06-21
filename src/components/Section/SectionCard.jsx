import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaStopwatch, FaTrash } from "react-icons/fa";

function SectionCard({ branch_id, section }) {
  return (
    <div className="section flex flex-col gap-2 p-5 card ">
      <div className="flex">
        <h1>ID</h1>:<p>{section.sec_id}</p>
      </div>
      <div className="flex">
        <h1>Name</h1>:<p>{section.name}</p>
      </div>
      <div className="flex gap-3">
        <Link
          className="d-center"
          to={`/branch/${branch_id}/section/edit/${section.sec_id}`}
        >
          <FaEdit size={24} />
        </Link>
        <Link
          className="d-center"
          to={`/branch/${branch_id}/section/delete/${section.sec_id}`}
        >
          <FaTrash size={24} />
        </Link>
        <Link
          className="d-center"
          to={`/branch/${branch_id}/section/${section.sec_id}/timetable/get`}
        >
          <FaStopwatch size={24} />
        </Link>
      </div>
    </div>
  );
}
export default SectionCard;
