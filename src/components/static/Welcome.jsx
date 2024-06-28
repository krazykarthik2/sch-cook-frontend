// Welcome.jsx

import React from "react";
import { FaBars, FaTerminal } from "react-icons/fa";
import { Link, useParams, useSearchParams } from "react-router-dom";

const Welcome = ({ username }) => {
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  return (
    <div className="h-screen d-center w-full bg-gradient-to-br from-black to-sky-500 p-10  shadow-lg text-white">
      <div className="fixed top-0 w-full d-center justify-between p-5">
        <div className="left"></div>
        {URLSearchParams.get("terminal")=="true" && (
          <Link className="d-center flex-col gap-2" to={"?terminal=false"}>
            <FaTerminal size={35} className="text-white" />
            <span className="tracking-widest text-lg font-I">close</span>
          </Link>
        )}
      </div>
      <div className="text-center">
        <h1 className="text-5xl font-extrabold leading-tight mb-4 text-left">
          Welcome,
          <br /> {username}!
        </h1>
        <p className="text-lg mb-6">
          Embark on your journey through the cosmos.
        </p>
      </div>
      <div className="bottom fixed bottom-0 left-0 p-5 w-full d-center justify-between gap-2">
        <Link className="d-center gap-2" to={"/menu"}>
          <FaBars size={35} className="text-white" />
          <h1 className="tracking-widest text-4xl">MENU</h1>
        </Link>

        <Link className="d-center gap-2" to={"?terminal=true"}>
          <FaTerminal size={35} className="text-white" />
          <h1 className="tracking-widest text-4xl">SHELL</h1>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
