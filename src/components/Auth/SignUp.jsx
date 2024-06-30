import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
    HiOutlineArrowNarrowLeft,
    HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { LuHelpCircle } from "react-icons/lu";
import { TbLockQuestion } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { AlertInfo } from "../utils/Alerts";
function SignUp() {
    const [isPassVisible, setIsPassVisible] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const location = useLocation();
    useEffect(() => {
      if (location && location.state) {
        setFormData({
          email: location.state.email,
          password: location.state.password,
        });
      }
    }, [location]);
    function handleSubmit(e) {
      e.preventDefault();
    }
    return (
      <div
        className="min-h-screen d-center flex-col "
      >
        <form
        onSubmit={handleSubmit} className="p-5 font-I xs:p-0 mx-auto md:w-full md:max-w-md flex flex-col gap-5">
          <h1 className="font-bold text-center text-2xl ">SCH-COOK</h1>
          <div className=" shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData((x) => ({ ...x, email: e.target.value }))
                }
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <div className="flex gap-2">
                <div className="flex flex-col w-full">
                  <label className=" font-semibold text-sm text-gray-600 pb-1">
                    Password
                  </label>
  
                  <input
                    type={isPassVisible ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((x) => ({ ...x, password: e.target.value }))
                    }
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                </div>
                <button
                  tabIndex={-1}
                  className="unbtn d-center"
                  onClick={() => {
                    setIsPassVisible((e) => {
                      console.log(e);
                      return !e;
                    });
                  }}
                  accessKey="i"
                >
                  {!isPassVisible ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
                </button>
              </div>
              <button type="button" className="d-center w-full">
                <span className="inline-block mr-2">Sign Up</span>
                <HiOutlineArrowNarrowRight />
              </button>
            </div>
            <div className=" d-center">
              <Link
                to="../login"
                state={{email:formData.email,password:formData.password}}
                className="unbtn p-2 underline transition duration-200 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-300 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
              >
                Already have an account? Log in
              </Link>
            </div>
            <div className="p-5">
              <div className="d-center">
                <button
                  type="button"
                  className="d-center transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center "
                >
                  Continue with Google
                </button>
              </div>
            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <Link to={"../forgot"} state={{email:formData.email}} className="unbtn d-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-300 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <TbLockQuestion size={18} />
                    <span className="inline-block ml-1">Forgot Password</span>
                  </Link>
                </div>
                <div className="text-center sm:text-right whitespace-nowrap">
                  <Link to={"../help"} className="unbtn d-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <LuHelpCircle size={18} />
                    <span className="inline-block ml-1">Help</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="d-center">
              <div className="d-center sm:text-left whitespace-nowrap">
                <Link to={location?.from||"/"} className="unbtn d-center gap-2 transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <HiOutlineArrowNarrowLeft size={23} />
                  <span className="inline-block ">Back </span>
                </Link>
              </div>
            </div>
          </div>
        </form>
        <AlertInfo
          content={
            <div className="flex gap-3">
              <span>Alt + I for password </span>
              <FaEye size={20} />
            </div>
          }
        />
      </div>
    );
}

export default SignUp;
