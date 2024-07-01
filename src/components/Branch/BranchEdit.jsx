import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import branch from "../../utils/branch";
import branchcode from "../../utils/branchcode";
import { toastThis } from "../../utils/fx";

const BranchEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [year, setYear] = useState("");
  const [branchCodeOpts, setBranchCodeOpts] = useState([]);
  const [searchP, setSearchP] = useSearchParams();
  useEffect(() => {
    branchcode.getAll().then((result) => {
      setBranchCodeOpts(result.data);
    });
  }, []);
  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await branch.get(id);
        setName(response.data.name);
        setBranchId(response.data.branch_id);
        setBranchCode(response.data.branch_code);
      } catch (error) {
        console.error("Error fetching branch:", error);
      }
    };
    fetchBranch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toastThis(
      () => branch.edit(id, { year: year, branch_code: branchCode }),
      () => navigate("/branch/get"),
      {
        pending: `Modifying Branch ${id}`,
        error: `Error in modifying branch ${id}`,
        success: `Branch ${id} modified successfully`,
      }
    );
  };

  return (
    <div>
      <h2 className="text-4xl">Edit Branch</h2>
      <form onSubmit={handleSubmit} className="card m-5 flex flex-col gap-5">
        <h1 className="text-3xl text-gray-500">#{branchId}</h1>

        <div className="flex flex-col">
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
        </div>
        <div className="flex flex-col">
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
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BranchEdit;
