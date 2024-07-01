import React from "react";

function Exact({ command, result }) {
  return (
    <div className="w-full flex p-5 font-code">
      <div
        className={
          "unbtn text-start  text-white p-2 rounded-lg flex w-full justify-between items-center bg-gray-900"
        }
      >
        <span className="inline-flex">{command?.split(" ")[0]} </span>
        <span className="inline-flex gap-2">
          {result?.nav?.split(":")
            .map((e) => e.split("/")[0])
            .slice(1)
            .map((e,index) => (
              <span  key={index} className="bg-gray-500 rounded-md p-1 flex gap-1">
                <span className="place">{e}</span>
              <span className="bg-black text-white px-2 rounded-md">{command?.split(" ").filter(e=>e!="")[index+1]}</span>
              </span>
            ))}
        </span>
      </div>
    </div>
  );
}

export default Exact;
