import { default as React, useEffect, useState } from "react";

function Recommend({
  similar,
  setSimilar,
  value,
  beforeDot,
  afterDot,
  setCommand,
  focusTerminal,
  result,
}) {
  useEffect(() => {
    let sim = true;
    for (let i in afterDot) {
      if (value[i] != afterDot[i]) {
        sim = false;
        break;
      }
    }
    setSimilar(sim);
  }, [afterDot, value]);
  return (
    <button
      className={
        "unbtn text-start  text-white p-2 rounded-lg flex justify-between items-center " +
        (similar ? "bg-gray-900" : "bg-gray-500")
      }
      onClick={() => setCommand(beforeDot + "." + value)}
    >
      <span className="inline-flex">
        {beforeDot}.{value}{" "}
      </span>
      <span className="inline-flex gap-2">
        {result?.nav
          ?.split(":")
          .map((e) => e.split("/")[0])
          .slice(1)
          .map((e) => (
            <span className="bg-gray-500 rounded-md p-1">{e}</span>
          ))}
      </span>
    </button>
  );
}
function RecommendSecond({
  recom,
  cmdbeforedot,
  cmdafterdot,
  setCommand,
  focusTerminal,
  setBestSuggestion,
}) {
  const [sim_sort, setSim_sort] = useState([]);
  window.sim = sim_sort;
  useEffect(() => {
    let index = sim_sort.findIndex((e) => e == true);
    if (index == -1) setBestSuggestion("");
    else setBestSuggestion(cmdbeforedot + "." + Object.keys(recom)[index]);
  }, [sim_sort]);

  return (
    <div className="flex flex-col gap-1 font-code px-5 mx-10">
      {Object.keys(recom)
        .map((e, i) => ({ e, x: sim_sort[i], original_index: i }))
        .sort((a, b) => a.x - b.x)
        .map(({ e, original_index }, index) => (
          <Recommend
            key={index}
            beforeDot={cmdbeforedot}
            afterDot={cmdafterdot}
            setCommand={(e) => {
              setCommand(e);
              focusTerminal();
            }}
            focusTerminal={focusTerminal}
            value={e}
            result={recom[e]}
            similar={sim_sort[original_index]}
            setSimilar={(num) => {
              setSim_sort((e) => {
                let x = [...e];
                x[original_index] = num;
                return x;
              });
            }}
          />
        ))}
    </div>
  );
}
export default RecommendSecond;
