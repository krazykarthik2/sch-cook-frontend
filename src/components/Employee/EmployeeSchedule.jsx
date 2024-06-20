import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import employee from "../../utils/employee";
const day_arr = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const toTable = (schedule) => {
  let table = Array.from(
    { length: schedule?.MON?.length || 0 },
    () => new Array(7)
  );
  console.log(table);
  for (let day in schedule) {
    for (let period in schedule[day]) {
      console.log(period, day);
      table[period][day_arr.findIndex((e) => e == day)] = schedule[day][period];
    }
  }
  return table;
};
function Empty() {
  return <div className="h-12 d-center">empty</div>;
}
function Cell({ value }) {
  return (
    <div className="flex gap-2">
      <div className="d-center">{value?.subject_id}</div>
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
  const [table, setTable] = useState([[], [], [], [], [], [], []]);
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await employee.schedule.get(id);
        setSchedule(response.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    fetchSchedule();
  }, [id]);
  useEffect(() => {
    setTable(toTable(schedule));
  }, [schedule]);

  return (
    <div>
      <h2>Employee Schedule</h2>
      <table>
        <tr>
          {day_arr.map((e) => (
            <th>{e}</th>
          ))}
        </tr>
        {table.map((row) => (
          <tr>
            {row.map((cell) => (
              <td>{cell ? <Cell value={cell} /> : <Empty />}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default EmployeeSchedule;
