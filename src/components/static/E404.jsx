// File: src/components/AuthWall.jsx

import React from "react";
import { RiAdminLine } from "react-icons/ri";
import { TbError404 } from "react-icons/tb";
import { VscError } from "react-icons/vsc";

const E404 = () => {
  return (
    <div className="flex  items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded shadow-lg text-center">
          <h1 className="text-9xl  text-red-600">404</h1>
          <h2 className="text-5xl font-semibold text-gray-700 mb-2">
            Not Found
          </h2>
        <p className="text-3xl text-gray-600">
          The page you're looking for is not found
        </p>
      </div> 
    </div>
  );
};

export default E404;
