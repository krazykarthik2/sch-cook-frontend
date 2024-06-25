import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaDollarSign, FaTerminal } from "react-icons/fa";
import RecommendFirst from "./RecommendFirst";
import RecommendSecond from "./RecommendSecond";
import { useNavigate } from "react-router-dom";
import Exact from "./Exact";

const stop_Def_ctrl_keys = [
  "q",
  "e",
  "r",
  "y",
  "u",
  "i",
  "o",
  "p",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "b",
  "m",
];
const stop_Terminal_keys = ["Tab"];
function considerShortcut(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}
function Terminal() {
  const [isActive, setIsActive] = useState(false);

  const [command, setCommand] = useState("");
  const [cmdbeforedot, setCmdbeforedot] = useState("");
  const [cmdafterdot, setCmdafterdot] = useState("");
  const [linkEst, setLinkEst] = useState("");
  const [recom, setRecom] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [terminalFocused, setTerminalFocused] = useState(false);
  const [bestSugg_, setBestSugg_] = useState("");
  const ter_ref = useRef(null);
  const navigate = useNavigate();

  window.ref = ter_ref;

  ////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    //manage the shortcuts
    const fx = (e) => {
      if (e.ctrlKey) {
        console.log("ctrl" + e.key);

        if (
          stop_Def_ctrl_keys.includes(e.key) ||
          stop_Def_ctrl_keys.map((e) => e.toUpperCase()).includes(e.key)
        ) {
          if (e.key == "q" || e.key == "Q") {
            setIsActive((e) => !e);
            focusTerminal();
          }
          return considerShortcut(e);
        }
      } else if (isActive) {
        if (e.key == "Escape") {
          setIsActive(false);
        }
        if (e.key == "Tab") {
          acceptSuggestion();
        }
        if (
          stop_Terminal_keys.includes(e.key) ||
          stop_Terminal_keys.map((e) => e.toUpperCase()).includes(e.key)
        ) {
          return considerShortcut(e);
        }
      }
    };
    document.addEventListener("keydown", fx);
    return () => {
      document.removeEventListener("keydown", fx);
    };
  }, [isActive, bestSugg_]);
  ////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    //manage recommend and isValid,etc.
    let [bef_dot, aft_dot] = command.split(" ")[0].split(".");
    setCmdbeforedot(bef_dot);
    setCmdafterdot(aft_dot);
    if (links[bef_dot]) {
      setRecom({ ...links[bef_dot] });
    } else setRecom({});
    setIsValid(links[bef_dot] != null && links[bef_dot][aft_dot] != null);

    if(links[bef_dot])
      if(links[bef_dot][aft_dot])
        setBestSugg_("")
  }, [command]);

  ///links

  const links = {
    emp: {
      create: { nav: "/employee/create" },
      edit: { nav: "/employee/edit/:id" },
      delete: { nav: "/employee/delete/:id" },
      get: { nav: "/employee/get" },
      id: { nav: "/employee/get/:id" },
      schedule: { nav: "/employee/timetable/get/:id" },
    },
    branch: {
      create: { nav: "/branch/create" },
      edit: { nav: "/branch/edit/:id" },
      delete: { nav: "/branch/delete/:id" },
      get: { nav: "/branch/get" },
      id: { nav: "/branch/get/:id" },
    },
    bcode: {
      create: { nav: "/branchcode/create" },
      edit: { nav: "/branchcode/edit/:branch_code" },
      delete: { nav: "/branchcode/delete/:branch_code" },
      get: { nav: "/branchcode/get" },
      id: { nav: "/branchcode/get/:branch_code" },
    },
    sec: {
      create: { nav: "/branch/:branch_id/section/create" },
      edit: { nav: "/branch/:branch_id/section/edit/:id" },
      delete: { nav: "/branch/:branch_id/section/delete/:id" },
      get: { nav: "/branch/:branch_id/section/" },
    },
    timetable: {
      get: { nav: "/branch/:branch_id/section/:section_id/timetable/get" },
      edit: { nav: "/branch/:branch_id/section/:section_id/timetable/edit" },
      delete: {
        nav: "/branch/:branch_id/section/:section_id/timetable/delete",
      },
    },
    sub: {
      get: { nav: "/subject/get" },
      id: { nav: "/subject/get/:id" },
      create: { nav: "/subject/create" },
      edit: { nav: "/subject/edit/:id" },
      delete: { nav: "/subject/delete/:id" },
    },
    rel: {
      get: { nav: "/relation/get" },
      id: { nav: "/relation/get/:id" },
      create: { nav: "/relation/create" },
      edit: { nav: "/relation/edit/:id" },
      delete: { nav: "/relation/delete/:id" },
    },

    this: {
      home: { nav: "/" },
      menu: { nav: "/menu" },
      loader: { nav: "/loader" },
      exit: { fx: () => setIsActive(false) },
    },
  };
  ////////

  function acceptSuggestion() {
    if (bestSugg_ != "") setCommand(bestSugg_);
  }

  function focusTerminal() {
    ter_ref?.current?.focus();
  }

  function exec() {
    const cmd = links[cmdbeforedot][cmdafterdot];
    if (cmd.nav) {
      if (cmd.nav.includes(":")) {
        let var_ = cmd.nav
          .split(":")
          .map((e) => e.split("/")[0])
          .slice(1)
          .map((e) => ":" + e);
        let values_ = command.split(" ").slice(1).filter(e=>e!='');
        console.log(var_, values_);
        let nav_ = cmd.nav;
        for (let i in var_) {
          nav_ = nav_.replaceAll(var_[i], values_[i]);
        }
        navigate(nav_);
      } else {
        navigate(cmd.nav);
        setIsActive(false);
      }
    }
    if (cmd.fx) {
      cmd.fx();
      setCommand("");
    }
  }
  return (
    isActive && (
      <div className="flex flex-col gap-2 backdrop-blur-lg fixed w-screen bottom-0">
        {isValid ? (
          <div className="isValid">
            <Exact
              {...{
                command,
                result: links[cmdbeforedot]
                  ? links[cmdbeforedot][cmdafterdot]
                  : null,
              }}
            />
          </div>
        ) : (
          <div className="isNotValid">
            {links[cmdbeforedot] != null ? (
              <div className="beforeDot-invalid">
                <RecommendSecond
                  {...{
                    recom,
                    cmdbeforedot,
                    cmdafterdot,
                    setCommand,
                    focusTerminal,
                    setBestSuggestion: setBestSugg_,
                  }}
                />
              </div>
            ) : (
              <div className="beforeDot-valid">
                {!cmdafterdot && (
                  <div className="afterDot-invalid">
                    <RecommendFirst
                      values={Object.keys(links)}
                      beforeDot={cmdbeforedot}
                      setCommand={setCommand}
                      focusTerminal={focusTerminal}
                      setBestSuggestion={setBestSugg_}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 p-3 bg-black transition-all *:!transition-all text-white m-3 rounded-xl">
          <div className={isValid ? "ms-4" : ""}>
            <TerminalIcon {...{ isValid, terminalFocused }} />
          </div>
          <div className="relative w-full d-center">
            <input
              type="text"
              value={bestSugg_}
              className="absolute  left-0 pointer-events-none !border-none !bg-transparent !p-0 !ps-3 !outline-none !text-gray font-code"
            />
            <input
              ref={ter_ref}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyUp={(e) => {
                if (isValid) if (e.key == "Enter") exec();
              }}
              autoFocus={true}
              autoCapitalize={false}
              autoComplete={false}
              autoCorrect={false}
              autoSave={false}
              spellCheck={false}
              onFocus={() => setTerminalFocused(true)}
              onBlur={() => setTerminalFocused(false)}
              className="absolute left-0 !border-none !bg-transparent !p-0 !ps-3 !outline-none !text-white font-code"
            />
          </div>
        </div>
      </div>
    )
  );
}

export default Terminal;
function TerminalIcon({ isValid, terminalFocused }) {
  return isValid ? (
    <FaArrowRight size={22} />
  ) : terminalFocused ? (
    <FaDollarSign size={22} />
  ) : (
    <FaTerminal size={20} />
  );
}
