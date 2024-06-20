import axios from "axios";
import React, { useEffect, useState } from "react";
import branch from "../../utils/branch";
import branchcode from "../../utils/branchcode";

const BranchCreate = () => {
  const [year, setYear] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [branchCodeOpts, setBranchCodeOpts] = useState([]);
  useEffect(() => {
    branchcode.getAll().then((result) => {
      setBranchCodeOpts(result.data);
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await branch.create({ branch_id: branchId });
      setBranchId("");
    } catch (error) {
      console.error("Error creating branch:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-3 p-5 card m-5"
      >
        <h2 className="title">Create Branch</h2>
        <label htmlFor="id" className="font-I">
          Branch id
        </label>
        <input
          id="id"
          type="text"
          value={branchId}
          onChange={(e) => setBranchId(e.target.value)}
          placeholder="Branch ID"
        />
        <label htmlFor="year" className="font-I">
          Year
        </label>
        <input
          id="year"
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="year"
        />
        <label htmlFor="code" className="font-I">
          Branch Code:{branchCode}
        </label>
        <select
          value={branchCode}
          onInput={(e) => setBranchCode(e.target.value)}
        >
          <option key="a" value="">
            Choose
          </option>
          {branchCodeOpts.map((opt, ind) => (
            <option key={ind} value={opt.branch_code}>
              {opt.name}
            </option>
          ))}
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BranchCreate;
