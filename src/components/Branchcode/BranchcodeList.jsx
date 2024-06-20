import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import branchcode from "../../utils/branchcode";

function BranchcodeRow({ branchCode, onView, onDelete, onEdit }) {
  return (
    <tr key={branchCode._id}>
      <td>{branchCode.branch_code}</td>
      <td>{branchCode.name}</td>
      <td className="text-center">
      <Link className="d-center" to={`/branchcode/get/${branchCode.branch_code}`}>
          <FaEye size={20} />
        </Link>
      </td>
      <td className="text-center">
        <Link className="d-center" to={`/branchcode/edit/${branchCode.branch_code}`}>
          <FaEdit size={20} />
        </Link>
      </td>
      <td className="text-center">
      <Link className="d-center" to={`/branchcode/delete/${branchCode.branch_code}`}>
          <FaTrash size={20} />
        </Link>
      </td>
    </tr>
  );
}

const BranchcodeList = () => {
  const [branchCodes, setBranchCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranchCodes = async () => {
      try {
        const response = await branchcode.getAll();
        setBranchCodes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching branch codes:", error);
        setLoading(false);
      }
    };

    fetchBranchCodes();
  }, []);

  const handleDelete = async (branchCode) => {
    try {
      await branchcode._delete(branchCode._id);
      setBranchCodes(branchCodes.filter(bc => bc._id !== branchCode._id));
    } catch (error) {
      console.error("Error deleting branch code:", error);
    }
  };


  return (
    <div className="h-full w-full p-5">
      <h2>Branch Codes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full h-full">
          <thead>
            <tr>
              <th>Branch Code</th>
              <th>Name</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {branchCodes.map((branchCode) => (
              <BranchcodeRow
                key={branchCode._id}
                branchCode={branchCode}
                
              />
            ))}
          </tbody>
        </table>
      )}
      <div className="absolute m-5 bottom-0 right-0">
        <Link
          to="/branchcode/create"
          className="btn w-min flex flex-col items-center justify-center"
        >
          <FaPlus size="45" />
          <div className="hidden sm:flex">Create Branch Code</div>
        </Link>
      </div>
    </div>
  );
};

export default BranchcodeList;
