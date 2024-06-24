import React, { useEffect, useState } from "react";
function Recom_div({
  similar,
  setSimilar,
  value,
  beforeDot,
  setCommand,
  focusTerminal,
}) {
  useEffect(() => {
    let sim = true;
    for (let i in beforeDot) {
      if (value[i] != beforeDot[i]) {
        sim = false;
        break;
      }
    }
    setSimilar(sim);
  }, [beforeDot, value]);
  return (
    <button
      className={
        "unbtn text-start  text-white p-2 rounded-lg " +
        (similar ? "bg-gray-900" : "bg-gray-500")
      }
      onClick={() => {
        setCommand(value);
        focusTerminal();
      }}
    >
      {value}
    </button>
  );
}
function RecommendFirst({
  values,
  beforeDot,
  setCommand,
  focusTerminal,
  setBestSuggestion,
}) {
  const [sim_sort, setSim_sort] = useState([]);
  useEffect(() => {
    let index = sim_sort.findIndex((e) => e == true);
    if (index == -1) setBestSuggestion("");
    else setBestSuggestion(values[index]);
  }, [sim_sort]);
  return (
    <div className="flex flex-col gap-1 font-code px-5 mx-10">
      {values
        .map((e, i) => ({ e, x: sim_sort[i], original_index: i }))
        .sort((a, b) => a.x - b.x)
        .map(({ e: val, original_index }, index) => (
          <Recom_div
            similar={sim_sort[original_index]}
            setSimilar={(num) => {
              setSim_sort((e) => {
                let x = [...e];
                x[original_index] = num;
                return x;
              });
            }}
            key={index}
            value={val}
            {...{ beforeDot, setCommand, focusTerminal }}
          />
        ))}
    </div>
  );
}
export default RecommendFirst;
