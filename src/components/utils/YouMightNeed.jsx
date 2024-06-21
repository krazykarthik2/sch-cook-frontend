import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaAngleDoubleDown,
  FaAngleDoubleUp, FaAngleRight
} from "react-icons/fa";

 function YouMightNeed({content}) {
  const [open, setOpen] = useState(true);
  function toggle() {
    setOpen((e) => !e);
  }
  return (
    <div className="d-center flex flex-col">
      <div className="flex w-full">
        <h5 className="w-full text-left">You might look for:</h5>
        <button className="unbtn " onClick={toggle}>
          {open ? (
            <FaAngleDoubleDown size={20} />
          ) : (
            <FaAngleDoubleUp size={20} />
          )}
        </button>
      </div>
      {open && (
        <div className="content">
          {content}
        </div>
      )}
    </div>
  );
}
export default YouMightNeed;