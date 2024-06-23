import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
const day_array = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
function ShowAvailability({
  emp_sch,
  day,
  period,
  setIsAvl,
  branch_id,
  section_id,
}) {
  const sch = emp_sch?.sch[day_array[day]][period];
  useEffect(() => {
    setIsAvl(
      sch == null || (sch.branch_id == branch_id && sch.sec_id == section_id)
    );
  }, [emp_sch, day, period]);
  return (
    <div className="flex gap-2">
      <div className="avl">
        {sch == null && <FaThumbsUp size={20} />}
        {sch &&
          sch.branch_id == branch_id &&
          sch.sec_id == section_id &&
          "teaching in previous timetable"}
        {sch && (sch.branch_id != branch_id || sch.sec_id != section_id) && (
          <div className="flex flex-col">
            <div>N/A</div>
            <div>
              @{sch.branch_id}:{sch.section_id}
            </div>
          </div>
        )}
      </div>
      <div className="emp_sch"></div>
    </div>
  );
}
function ShowSub({
  sub,
  relations,
  employees,
  branch_id,
  section_id,
  emp_schedules,
  day,
  period,
  onClick,
}) {
  const relation = relations?.find(
    (e) =>
      e?.branch_id == branch_id &&
      e?.sec_id == section_id &&
      e?.subject_id == sub.subject_id
  );
  const employee = employees?.find((e) => e?.emp_id == relation?.emp_id);
  const emp_sch = emp_schedules?.find((e) => e?.emp_id == employee?.emp_id);
  const [isAvl, setIsAvl] = useState(false);
  return (
    <button
      className={
        "subject card unbtn " +
        (relation == null
          ? "bg-red-400"
          : isAvl
          ? ""
          : "bg-gray-500 pointer-events-none")
      }
      onClick={() => {
        if (relation != null){ if (isAvl) onClick(sub.subject_id);}
      }}
    >
      <div className="flex items-baseline justify-between">
        <div className="subject_id h2 title">{sub.subject_id}</div>:
        <div className="subject_name">{sub.name}</div>
      </div>
      {relation == null && (
        <Link
          className="btn flex"
          to={"/relation/create"}
          state={{ branch_id, sec_id: section_id, subject_id: sub?.subject_id }}
        >
          {" "}
          Assign Teacher
        </Link>
      )}
      <div className="employee flex justify-between">
        <div className="employee_id">{relation?.emp_id}</div>
        <div className="employee_name">{employee?.name}</div>
      </div>
      {relation != null && (
        <>
          {day != null && period != null && (
            <ShowAvailability
              {...{ emp_sch, day, period, setIsAvl, branch_id, section_id }}
            />
          )}
        </>
      )}
    </button>
  );
}
function Empty({ onClick }) {
  return (
    <button
      className={"subject card unbtn "}
      onClick={() => {
        onClick(null);
      }}
    >
      Empty
    </button>
  );
}
function ShowSubjects(props) {
  return (
    <div className="subjects flex gap-2">
      {props.subjects.map((sub, ind) => (
        <ShowSub key={ind} sub={sub} {...props} />
      ))}
      <Empty {...props} />
    </div>
  );
}
export default ShowSubjects;
