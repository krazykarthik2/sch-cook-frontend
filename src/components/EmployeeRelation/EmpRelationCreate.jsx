import React, { useEffect, useState } from "react";
import branch from "../../utils/branch";
import employee from "../../utils/employee";
import subject from "../../utils/subject";
import emprelation from "../../utils/emprelation";
import FormSelect from "../utils/FormSelect";

const EmpRelationCreate = () => {
  const [empId, setEmpId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [secId, setSecId] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const [employees, setEmployees] = useState([]);
  const [branches, setBranches] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [employee_opt, setEOpt] = useState({});
  const [branches_opt, setBOpt] = useState({});
  const [section_opt, setSecOpt] = useState({});
  const [subjects_opt, setSOpt] = useState({});

  useEffect(() => {
    employee.getAll().then((response) => {
      setEmployees(response.data);
    });
    branch.getAll().then((response) => {
      setBranches(response.data);
    });
    subject.getAll().then((response) => {
      setSubjects(response.data);
    });
  }, []);

  useEffect(() => {
    let x = {};
    employees?.forEach((e) => {
      x[e.emp_id] = e.name;
    });
    setEOpt(x);
  }, [employees]);

  useEffect(() => {
    let x = {};
    sections?.forEach((e) => {
      x[e.sec_id] = e.sec_id;
    });
    setSecOpt(x);
  }, [sections]);

  useEffect(() => {
    let x = {};
    branches?.forEach((e) => {
      x[e.branch_id] = e.branch_id;
    });
    setBOpt(x);
  }, [branches]);

  useEffect(() => {
    let x = {};
    subjects?.forEach((e) => {
      x[e.subject_id] = e.name;
    });
    setSOpt(x);
  }, [subjects]);

  useEffect(() => {
    setSections(branches?.find((e) => e.branch_id == branchId)?.sections);
  }, [branchId, branches]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emprelation.create({
        emp_id: empId,
        branch_id: branchId,
        sec_id: secId,
        subject_id: subjectId,
      });
      setEmpId("");
      setBranchId("");
      setSecId("");
      setSubjectId("");
    } catch (error) {
      console.error("Error creating relation:", error);
    }
  };

  return (
    <div>
      <h2>Create Employee Relation</h2>
      <form
        onSubmit={handleSubmit}
        className="flex card flex-col p-2 m-3 gap-3"
      >
        <div className="flex flex-col p-3">
          <label className="font-I flex justify-between" htmlFor="emp_id">
            <span>Employee </span>
            <p className="text-muted">{empId}</p>
          </label>
          <FormSelect
            value={empId}
            opts={employee_opt}
            name="emp_id"
            onChange={(e) => setEmpId(e.target.value)}
          />
        </div>

        <div className="flex flex-col p-3">
          <label className="font-I flex justify-between" htmlFor="branch_id">
            <span>Branch </span>
            <p className="text-muted">{branchId}</p>
          </label>
          <FormSelect
            value={branchId}
            opts={branches_opt}
            name="branch_id"
            onChange={(e) => setBranchId(e.target.value)}
          />
        </div>

        <div className="flex flex-col p-3">
          <label className="font-I flex justify-between" htmlFor="sec_id">
            <span>Section </span>
            <p className="text-muted">{secId}</p>
          </label>
          <FormSelect
            value={secId}
            opts={section_opt}
            name="sec_id"
            onChange={(e) => setSecId(e.target.value)}
          />
        </div>

        <div className="flex flex-col p-3">
          <label className="font-I flex justify-between" htmlFor="subject_id">
            <span>Subject </span>
            <p className="text-muted">{subjectId}</p>
          </label>
          <FormSelect
            value={subjectId}
            opts={subjects_opt}
            name="subject_id"
            onChange={(e) => setSubjectId(e.target.value)}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EmpRelationCreate;
