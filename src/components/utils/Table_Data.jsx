import React, { useEffect, useState } from "react";
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
const Table_Data = ({ schedule, Cell, passData, Empty  }) => {
  const [table, setTable] = useState([]);
  useEffect(() => {
    setTable(toTable(schedule));
  }, [schedule]);

  return (
    <table className="m-auto">
      <tbody>
        <tr>
          <td key="-1" className="font-I">
            #
          </td>
          {day_arr.map((e, i) => (
            <th key={i}>{e}</th>
          ))}
        </tr>

        {table.map((row, i) => (
          <tr key={i}>
            <td key="-1" className="font-I">
              {i + 1}
            </td>
            {row.map((cell, ind) => (
              <td key={ind}>
                {cell ? (
                  <Cell period={i} day={ind} value={cell} passData={passData} />
                ) : (
                  <Empty
                    period={i}
                    day={ind}
                    value={cell}
                    passData={passData}
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table_Data;
