import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import branch from "../../utils/branch";
import branchcode from "../../utils/branchcode";
import YouMightNeed from "../utils/YouMightNeed";
import { toastThis } from "../../utils/fx";

const BranchCreate = () => {
  const [year, setYear] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [branchCodeOpts, setBranchCodeOpts] = useState([]);
  const [searchP, setSearchP] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    branchcode.getAll().then((result) => {
      setBranchCodeOpts(result.data);
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    toastThis(
      () =>
        branch.create({
          branch_id: branchId,
          branch_code: branchCode,
          year: year,
        }),
      () => {
        setBranchId("");
        navigate(searchP.get("continue") || "/branch/get");
      },
      {
        pending: `Creating branch ${branchId}`,
        error: `Error creating branch ${branchId}`,
        success: `Branch ${branchId} created successfully`,
      }
    );
  };

  return (
    <div className="h-screen p-5 flex flex-col justify-between">
      <form onSubmit={handleSubmit} className=" flex flex-col gap-3  card ">
        <h2 className="title">Create Branch</h2>
        <label htmlFor="id" className="font-I">
          Branch id
        </label>
        <input
          id="id"
          type="text"
          value={branchId}
          onChange={(e) =>
            setBranchId(e.target.value.toUpperCase().split(" ").join(""))
          }
          placeholder="Branch ID"
        />
        <label htmlFor="year" className="font-I">
          Year
        </label>
        <input
          id="year"
          type="number"
          min={1}
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
          id="code"
          name="code"
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
      <YouMightNeed
        content={
          <Link
            to="/branchcode/create?continue=/branch/create"
            className="btn flex"
          >
            <span> Create branch code</span> <FaAngleRight size={30} />
          </Link>
        }
      />
    </div>
  );
};

export default BranchCreate;
