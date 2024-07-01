// File: src/components/Section/TimetableGet.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import employee from "../../../utils/employee";
import emprelation from "../../../utils/emprelation";
import subject from "../../../utils/subject";
import timetable from "../../../utils/timetable";
import Table_Data from "../../utils/Table_Data";
import Cell, { Empty } from "./Cell";
import ShowSubjects from "./ShowSubjects";
import { toastThis } from "../../../utils/fx";
const dummy = {
  MON: [null, null, null, null, null, null, null, null],
  TUE: [null, null, null, null, null, null, null, null],
  WED: [null, null, null, null, null, null, null, null],
  THU: [null, null, null, null, null, null, null, null],
  FRI: [null, null, null, null, null, null, null, null],
  SAT: [null, null, null, null, null, null, null, null],
};
const day_array = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

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
  const [active, setActive] = useState({ day: null, period: null });

  const [emp_schedules, setEmpSch] = useState([]);

  useEffect(() => {
    if (!timetable_edited) return;
    if (!timetable__) return;
    const days = Object.keys(timetable__);
    let isFilled = false;
    let isDiff = false;
    for (let i of days) {
      for (let j in timetable_edited[i]) {
        if (timetable_edited[i][j] != null) {
          isFilled = true;
          break;
        }
      }
    }
    for (let i of days) {
      for (let j in timetable_edited[i]) {
        if (timetable_edited[i][j] != timetable__[i][j]) {
          isDiff = true;
          break;
        }
      }
    }
    setIsValid(isFilled && isDiff);
  }, [timetable__, timetable_edited]);

  const navigate = useNavigate();
  useEffect(() => {
    setT_Edited(() => {
      if (!timetable__) return;
      let x = {};
      for (let i of day_array) {
        x[i] = [];
        for (let j in timetable__[i]) {
          x[i][j] = timetable__[i][j];
        }
      }
      return x;
    });
  }, [timetable__]);

  useEffect(() => {
    //getting__all_subjects
    if (not_exist != null)
      if (timetable__)
        subject.getAll().then((response) => {
          if (response) setSubjects(response.data);
        });
  }, [timetable__]);

  useEffect(() => {
    //getting_all_emp_relations
    if (not_exist != null)
      if (timetable__)
        emprelation
          .getAll({
            branch_id: branch_id,
            section_id: section_id,
          })
          .then((response) => {
            setRelations(response.data);
          });
  }, [timetable__]);

  useEffect(() => {
    //getting_emp_by_relations
    if (relations.length)
      if (relations[0].emp_id)
        employee.getAll(relations.map((e) => e.emp_id)).then((response) => {
          setEmployees(response.data);
        });
  }, [relations]);

  useEffect(() => {
    //getting_emp_schedules
    employees.forEach((__emp) => {
      employee.schedule.get(__emp.emp_id).then((response) => {
        setEmpSch((e) => {
          if (e.findIndex((n) => n.emp_id == __emp.emp_id) == -1)
            return [...e, { emp_id: __emp.emp_id, sch: response.data }];
          else {
            let x = [...e];
            x.find((n) => n.emp_id == __emp.emp_id).sch = response.data;
            return x;
          }
        });
      });
    });
  }, [employees]);

  function loadTimetable() {
    timetable
      .get(branch_id, section_id)
      .then((data) => {
        if (data == null || Object.keys(data).length == 0) setNot_exist(true);
        else setNot_exist(false);
        setTimetable__(data || dummy);
      })
      .catch((error) => console.error("Error fetching timetable:", error));
  }

  useEffect(() => {
    loadTimetable();
  }, [branch_id, section_id]);

  function save(callback = () => {}) {
    toastThis(
      () => timetable.edit(branch_id, section_id, timetable_edited),
      (response) => {
        if (response.data.result == "success") alert("successfully edited");
        callback();
        loadTimetable();
      },
      {
        pending: `Modifying Timetable of ${section_id} in ${branch_id}`,
        error: `Error Modifying Timetable of ${section_id} in ${branch_id}`,
        success: `Timetable of ${section_id} in ${branch_id} is modified successfully`,
      }
    );
  }
  function back() {
    navigate("../get");
  }

  function onCellClick(day, period) {
    if (day == active.day && period == active.period)
      setActive({ day: null, period: null });
    else setActive({ day: day, period: period });
  }
  function onSubClick(subject_id) {
    if (active.day != null && active.period != null)
      setT_Edited((e) => {
        let x = { ...e };
        x[day_array[active.day]][active.period] = subject_id;
        return x;
      });
  }

  return (
    <div className="h-screen flex flex-col justify-between p-2">
      <main>
        <h1>Timetable</h1>
        {not_exist == null && <>Loading</>}
        {not_exist === true && (
          <div className="flex flex-col">
            <div className="text-muted">time table doesn't exist </div>
          </div>
        )}
        <div className="flex flex-col mb-10">
          <Table_Data
            schedule={timetable_edited}
            Cell={Cell}
            Empty={Empty}
            passData={{
              branch_id: branch_id,
              section_id: section_id,
              subjects: subjects,
              employees: employees,
              relations: relations,
              onClick: onCellClick,
              timetable__,
              selected: [active.day, active.period],
              hide: {
                emp_id: hideEmpid,
                emp_name: hideEmpName,
                sub_name: hideSubName,
              },
            }}
          />
          <ShowSubjects
            {...{
              subjects,
              relations,
              employees,
              branch_id,
              section_id,
              emp_schedules,
              day: active.day,
              period: active.period,
              onClick: onSubClick,
            }}
          />
        </div>

        <div className="options">
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
        </div>
      </main>
      <div className=" w-full d-center">
        <button className="" onClick={() => save()} disabled={!isValid}>
          Save
        </button>
        {isValid && (
          <button className="" onClick={() => save(() => back())}>
            Save & Exit
          </button>
        )}
        {!isValid && (
          <button className="" onClick={() => back()}>
            Exit
          </button>
        )}
      </div>
    </div>
  );
};

export default TimetableEdit;
