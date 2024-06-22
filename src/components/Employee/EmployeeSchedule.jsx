import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import employee from "../../utils/employee";
import subject from "../../utils/subject";
const day_arr = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const toTable = (schedule) => {
  let table = Array.from(
    { length: schedule?.MON?.length || 0 },
    () => new Array(7)
  );
  for (let day in schedule) {
    for (let period in schedule[day]) {
      table[period][day_arr.findIndex((e) => e == day)] = schedule[day][period];
    }
  }
  return table;
};
function Empty() {
  return <div className="h-12 d-center">empty</div>;
}
function Cell({ value, subjects, hideSubName }) {
  return (
    <div className="flex  gap-2 p-1">
      <div className="flex flex-col">
        <div className="d-center">{value?.subject_id}</div>
        {hideSubName || (
          <div className="d-center">
            {subjects.find((e) => e?.subject_id == value?.subject_id)?.name}
          </div>
        )}
      </div>
      <div className="w-1 bg-white rounded-full"></div>
      <div className="flex flex-col">
        <div>{value?.branch_id}</div>
        <div>{value?.sec_id}</div>
      </div>
    </div>
  );
}
const EmployeeSchedule = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [table, setTable] = useState([[], [], [], [], [], [], []]);
  const [hideSubName, setHideSubName] = useState(false);
  const [employee__, setEmployee__] = useState({});
  window.subjects = subjects;
  window.subject = subject;
  const fetchSubjects = async (arr) => {
    try {
      const response = await subject.getAll(arr);
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };
  const fetchSchedule = async () => {
    try {
      const response = await employee.schedule.get(id);
      setSchedule(response.data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };
  const fetchEmployee = async () => {
    try {
      const response = await employee.get(id);
      setEmployee__(response.data);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };
  useEffect(() => {
    fetchSchedule();
    fetchEmployee();
  }, [id]);
  useEffect(() => {
    fetchSubjects(
      table
        .flat()
        .filter((e) => e)
        .map((e) => e.subject_id)
    );
  }, [table]);
  useEffect(() => {
    setTable(toTable(schedule));
  }, [schedule]);

  return (
    <div>
      <h2>
        {" "}
        Schedule of <span className="font-M font-bold">{employee__.name}</span>[
        <span className="font-M font-bold">{id}</span>]
      </h2>

      <table className="m-auto">
        <tr>
          {day_arr.map((e) => (
            <th>{e}</th>
          ))}
        </tr>
        {table.map((row) => (
          <tr>
            {row.map((cell) => (
              <td>
                {cell ? (
                  <Cell
                    value={cell}
                    subjects={subjects}
                    hideSubName={hideSubName}
                  />
                ) : (
                  <Empty />
                )}
              </td>
            ))}
          </tr>
        ))}
      </table>
      <div className="d-center gap-2">
        <input
          type="checkbox"
          name="sub_name"
          id="sub_name"
          checked={hideSubName}
          onInput={(e) => setHideSubName(!e.target.checked)}
        />
        <label htmlFor="sub_name" className="h2">
          Hide Subject Name
        </label>
      </div>
    </div>
  );
};

export default EmployeeSchedule;
