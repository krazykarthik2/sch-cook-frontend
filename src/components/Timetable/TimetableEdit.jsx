// File: src/components/Section/TimetableGet.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import employee from "../../utils/employee";
import emprelation from "../../utils/emprelation";
import { unique } from "../../utils/fx";
import subject from "../../utils/subject";
import timetable from "../../utils/timetable";
import Table_Data from "../utils/Table_Data";
function Cell({ value, passData }) {
  const relation = passData?.relations?.find(
    (e) =>
      e?.branch_id == passData?.branch_id &&
      e?.sec_id == passData?.section_id &&
      e?.subject_id == value
  );
  const employee = passData?.employees?.find(
    (e) => e?.emp_id == relation?.emp_id
  );
  const subject = passData?.subjects?.find((e) => e?.subject_id == value);
  return (
    <div className="flex  gap-2 p-1">
      <div className="flex flex-col">
        <div className="d-center">{value}</div>
        {passData?.hide.sub_name || (
          <div className="d-center">{subject?.name}</div>
        )}
      </div>
      {(passData?.hide.emp_id && passData?.hide.emp_name) || (
        <div className="w-1 bg-white rounded-full"></div>
      )}
      <div className="flex flex-col">
        {passData?.hide.emp_id || <div>{relation?.emp_id}</div>}
        {passData?.hide.emp_name || <div>{employee?.name}</div>}
      </div>
    </div>
  );
}
const dummy = {
  MON: [null, null, null, null, null, null, null, null],
  TUE: [null, null, null, null, null, null, null, null],
  WED: [null, null, null, null, null, null, null, null],
  THU: [null, null, null, null, null, null, null, null],
  FRI: [null, null, null, null, null, null, null, null],
  SAT: [null, null, null, null, null, null, null, null],
};
const TimetableEdit = () => {
  const { branch_id, section_id } = useParams();
  const [timetable__, setTimetable__] = useState(null);
  const [not_exist, setNot_exist] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [relations, setRelations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [timetable_edited, setT_Edited] = useState(null);
  const [hideEmpid, setHideEmpid] = useState(false);
  const [hideEmpName, setHideEmpName] = useState(false);
  const [hideSubName, setHideSubName] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if(!timetable)return;
    if(!timetable__)return;
    const days = Object.keys(timetable);
    let isFilled = false;
    let isDiff = false;
    for (let i of days) {
      for (let j in timetable__[i])
        if (timetable__[i][j] != null) {
          isFilled = true;
          break;
        }
    }
    for (let i of days) {
      for (let j in timetable__[i])
        if (timetable__[i][j] != timetable[i][j]) {
          isDiff = true;
          break;
        }
    }
    setIsValid(isFilled && isDiff);
  }, [timetable__, timetable]);

  const navigate = useNavigate();
  window._ = { subjects, relations, employees, timetable__ };
  useEffect(() => {
    setT_Edited(timetable__);
  }, [timetable__]);
  useEffect(() => {
    if (not_exist == false)
      if (timetable__)
        subject
          .getAll(
            unique(
              Object.entries(timetable__)
                .map((e) => e[1])
                .flat()
            )
          )
          .then((response) => {
            if (response) setSubjects(response.data);
          });
  }, [timetable__]);
  useEffect(() => {
    if (not_exist == false)
      if (timetable__)
        emprelation
          .getAll({
            branch_id: branch_id,
            section_id: section_id,
            subject_id: unique(
              Object.entries(timetable__)
                .map((e) => e[1])
                .flat()
            ),
          })
          .then((response) => {
            setRelations(response.data);
          });
  }, [timetable__]);
  useEffect(() => {
    if (relations.length)
      if (relations[0].emp_id)
        employee.getAll(relations.map((e) => e.emp_id)).then((response) => {
          setEmployees(response.data);
        });
  }, [relations]);
  useEffect(() => {
    timetable
      .get(branch_id, section_id)
      .then((data) => {
        if (data == null || Object.keys(data).length == 0) setNot_exist(true);
        else setNot_exist(false);
        setTimetable__(data || dummy);
      })
      .catch((error) => console.error("Error fetching timetable:", error));
  }, [branch_id, section_id]);

  function save(callback) {
    timetable.edit(branch_id, section_id, timetable_edited).then((response) => {
      if (response.data.result == "success") alert("successfully edited");
      callback();
    });
  }
  function back() {
    navigate("../get");
  }

  return (
    <div>
      <h1>Timetable</h1>
      {not_exist == null && <>Loading</>}
      {not_exist === true && (
        <div className="flex flex-col">
          <div className="text-muted">time table doesn't exist </div>
        </div>
      )}
      <Table_Data
        schedule={timetable_edited}
        Cell={Cell}
        passData={{
          branch_id: branch_id,
          section_id: section_id,
          subjects: subjects,
          employees: employees,
          relations: relations,
          hide: {
            emp_id: hideEmpid,
            emp_name: hideEmpName,
            sub_name: hideSubName,
          },
        }}
      />
      <div className="d-center">
        <input
          type="checkbox"
          checked={hideEmpid}
          onChange={(e) => setHideEmpid(e.target.checked)}
          name="emp-id"
          id="emp-id"
        />
        <label htmlFor="emp-id">Hide Employee ID</label>
      </div>
      <div className="d-center">
        <input
          type="checkbox"
          checked={hideEmpName}
          onChange={(e) => setHideEmpName(e.target.checked)}
          name="emp-name"
          id="emp-name"
        />
        <label htmlFor="emp-name">Hide Employee Name</label>
      </div>
      <div className="d-center">
        <input
          type="checkbox"
          checked={hideSubName}
          onChange={(e) => setHideSubName(e.target.checked)}
          name="sub-name"
          id="sub-name"
        />
        <label htmlFor="sub-name">Hide Subject Name</label>
      </div>
      <div className="absolute bottom-0 w-full d-center">
        <button className="" onClick={() => save()} disabled={!isValid}> 
          Save
        </button>
        <button className="" onClick={() => save(() => back())} disabled={!isValid}>
          Save & Exit
        </button>
      </div>
    </div>
  );
};

export default TimetableEdit;
