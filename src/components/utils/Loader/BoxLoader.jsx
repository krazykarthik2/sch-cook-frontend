import { useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function BoxLoader({ loading = true }) {
  const color= "#56f"

  return (
    <div className="loading flex w-screen h-screen bg-white/[.8] backdrop-blur-[4px] items-center justify-center">
      <div className=" flex flex-col items-center">
        <ClimbingBoxLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <h1 className="w-full text-center"style={{color:color}}>LOADING</h1>
      </div>
    </div>
  );
}

export default BoxLoader;
