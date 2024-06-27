// File: src/components/AuthWall.jsx

import React from "react";
import { RiAdminLine } from "react-icons/ri";
import { VscError } from "react-icons/vsc";

const AuthWall = () => {
  return (
    <div className="flex  items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded shadow-lg text-center">
        <div className="d-center flex-col  text-red-600">
      <VscError size={150} color="currentColor"/>
          <h1 className="text-9xl font-bold mb-4">403</h1>
        </div>
        <div className="d-center">
          <RiAdminLine size={50} />
          <h2 className="text-5xl font-semibold text-gray-700 mb-2">
            Forbidden
          </h2>
        </div>
        <p className="text-3xl text-gray-600">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
};

export default AuthWall;
