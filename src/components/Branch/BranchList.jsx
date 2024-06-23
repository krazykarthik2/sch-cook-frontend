import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaPlus, FaTable, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import branch from "../../utils/branch";
import branchcode from "../../utils/branchcode";
function BranchRow({ branch, branchCode }) {
  return (
    <tr key={branch._id}>
      <td>{branch.branch_id}</td>
      <td>{branch.branch_code}</td>
      <td>{branchCode?.name}</td>
      <td className="text-center">{branch.year}</td>
      <td>
        <Link className="d-center" to={`/branch/${branch.branch_id}/section/`}>
          <FaTable size={24} />
        </Link>
      </td>
      <td>
        <Link className="d-center" to={`/branch/get/${branch.branch_id}`}>
          <FaEye size={24} />
        </Link>
      </td>
      <td>
        <Link className="d-center" to={`/branch/edit/${branch.branch_id}`}>
          <FaEdit size={24} />
        </Link>
      </td>
      <td>
        <Link className="d-center" to={`/branch/delete/${branch.branch_id}`}>
          <FaTrash size={24} />
        </Link>
      </td>
    </tr>
  );
}

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [branchCodes, setBranchCodes] = useState([]);
  
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await branch.getAll();
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    const fetchBranchCodes = async () => {
      try {
        const response = await branchcode.getAll();
        setBranchCodes(response.data);
      } catch (error) {
        console.error("Error fetching branchCodes:", error);
      }
    };

    fetchBranches();
    fetchBranchCodes();
  }, []);

  return (
    <div className="h-full w-full p-5">
      <h2>Branches</h2>
      <table className="w-full h-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>code</th>
            <th>name</th>
            <th>Year</th>
            <th>Sec</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <BranchRow
              key={branch?.branch_id}
              branch={branch}
              branchCode={branchCodes.find(
                (e) => e.branch_code == branch.branch_code
              )}
            />
          ))}
        </tbody>
      </table>
      <div className="absolute m-5 bottom-0 right-0">
        <Link
          to="/branch/create"
          className="btn w-min flex flex-col items-center justify-center"
        >
          <FaPlus size="45" />
          <div className="hidden sm:flex">Create Branch</div>
        </Link>
      </div>
    </div>
  );
};

export default BranchList;
