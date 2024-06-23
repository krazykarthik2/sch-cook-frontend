import React from "react";

function FormSelect({ name, id, opts={}, onChange, value }) {
  return (
    <select {...{ name, id, onChange, value }}>
      <option key={-1} value="">
        Choose
      </option>
      {Object.keys(opts).map((e, index) => (
        <option key={index} value={e}>
          {opts[e]}
        </option>
      ))}
    </select>
  );
}

export default FormSelect;
