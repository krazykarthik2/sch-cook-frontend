import React from "react";
import { FaCheck } from "react-icons/fa6";

function Empty({ value, passData, day, period, timetable__ }) {
  const [day_sel, period_sel] = passData.selected;
  return (
    <div
      className="relative w-full h-full"
      onClick={() => passData.onClick(day, period)}
    >
      {day == day_sel && period == period_sel && (
        <div className="absolute w-full h-full d-center backdrop:blur-sm bg-white/25 pointer-events-none">
          <FaCheck size={24} color="#000" />
        </div>
      )}
      {((day == day_sel && period != period_sel) ||
        (day != day_sel && period == period_sel)) && (
        <div className="absolute w-full h-full d-center backdrop:blur-sm bg-black/50 pointer-events-none"></div>
      )}
      <div className="p-1 flex flex-col gap-2">
        <div className="d-center justify-between">
          <div className="d-center">empty</div>
        </div>
      </div>
    </div>
  );
}
function Cell({ value, passData, day, period, timetable__ }) {
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
  const [day_sel, period_sel] = passData.selected;
  return (
    <div
      className="relative w-full h-full"
      onClick={() => passData.onClick(day, period)}
    >
      {day == day_sel && period == period_sel && (
        <div className="absolute w-full h-full d-center backdrop:blur-sm bg-white/25 pointer-events-none">
          <FaCheck size={24} color="#000" />
        </div>
      )}
      {((day == day_sel && period != period_sel) ||
        (day != day_sel && period == period_sel)) && (
        <div className="absolute w-full h-full d-center backdrop:blur-sm bg-black/50 pointer-events-none"></div>
      )}
      <div className="p-1 flex flex-col gap-2">
        <div className="d-center justify-between">
          <div className="d-center">{value}</div>
          {passData?.hide.sub_name || (
            <>
              <div className="sep w-1 h-1 bg-white rounded-full"></div>
              <div className="d-center">{subject?.name}</div>
            </>
          )}
        </div>
        {(passData?.hide.emp_id && passData?.hide.emp_name) || (
          <div className="h-1 bg-white rounded-full"></div>
        )}
        <div className="d-center justify-between">
          {passData?.hide.emp_id || <div>{relation?.emp_id}</div>}
          {passData?.hide.emp_id || passData?.hide.emp_name || (
            <div className="sep w-1 h-1 bg-white rounded-full"></div>
          )}
          {passData?.hide.emp_name || <div>{employee?.name}</div>}
        </div>
      </div>
    </div>
  );
}
export { Empty };
export default Cell;
