import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { AlertError, AlertInfo } from "../utils/Alerts";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { TbLockQuestion } from "react-icons/tb";
import { LuHelpCircle } from "react-icons/lu";
import auth from "../../utils/auth";
function Login({loggedIn,handleLogin:props_handleLogin}) {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [processing_req, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [searchParams,searchfx] = useSearchParams();
  const navigate = useNavigate();
  useEffect(()=>{
    if(loggedIn){
      navigate(searchParams.get('continue')||'/welcome')
    }
  },[loggedIn])
  const location = useLocation();
  useEffect(() => {
    if (location && location.state) {
      setFormData({
        username: location.state.username||formData.username,
        password: location.state.password||formData.password,
      });
    }
  }, [location]);
  const handleLogin = async () => {
    try {
      const response = await auth.login(formData.username, formData.password);
      console.log("Login successful", response.data);
      props_handleLogin(response.data)
      setError("");
      // Handle successful login (e.g., save token, redirect)
    } catch (err) {
      setError("Invalid credentials");
      console.error("Error logging in", err);
    }
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setIsPassVisible(false)
    try {
      const result = await handleLogin();
      setProcessing(false);
      return true;
    } catch {
      setProcessing(false);
      return false;
    }
  }
  return (
    <div className="min-h-screen d-center flex-col ">
      {processing_req ? (
        <div className="bg-transparent-glass-sm"></div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-5 font-I xs:p-0 mx-auto md:w-full md:max-w-md flex flex-col gap-5"
        >
          <h1 className="font-bold text-center text-2xl ">SCH-COOK</h1>
          <div className=" shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Username
              </label>
              <input
                type="text"
                autoComplete="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData((x) => ({
                    ...x,
                    username: e.target.value.toLowerCase(),
                  }))
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
                    autoComplete="current-password"
                    onChange={(e) =>
                      setFormData((x) => ({ ...x, password: e.target.value }))
                    }
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  />
                </div>
                <button
                  tabIndex={-1}
                  className="unbtn"
                  onClick={() => {
                    setIsPassVisible((e) => {
                      console.log(e);
                      return !e;
                    });
                  }}
                  accessKey="i"
                >
                  {isPassVisible ? (
                    <FaEye size={25} />
                  ) : (
                    <FaEyeSlash size={25} />
                  )}
                </button>
              </div>
              <button type="submit" className="d-center w-full">
                <span className="inline-block mr-2">Login</span>
                <HiOutlineArrowNarrowRight />
              </button>
            </div>
            <div className=" d-center">
              <Link
                to="../signup"
                state={{
                  username: formData.username,
                  password: formData.password,
                }}
                className="unbtn p-2 underline transition duration-200 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-300 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
              >
                Don't have an account? Sign up
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
                  <button className="unbtn d-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-300 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <TbLockQuestion size={18} />
                    <span className="inline-block ml-1">Forgot Password</span>
                  </button>
                </div>
                <div className="text-center sm:text-right whitespace-nowrap">
                  <button className="unbtn d-center transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <LuHelpCircle size={18} />
                    <span className="inline-block ml-1">Help</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="d-center">
              <div className="d-center sm:text-left whitespace-nowrap">
                <Link
                  to={location?.from || "/"}
                  className="unbtn d-center gap-2 transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                >
                  <HiOutlineArrowNarrowLeft size={23} />
                  <span className="inline-block ">Back </span>
                </Link>
              </div>
            </div>
          </div>
        </form>
      )}
      <div className="flex flex-col gap-2">
        {error == "" || <AlertError content={error} />}
        <AlertInfo
          content={
            <div className="flex gap-3">
              <span>Alt + I for password </span>
              <FaEye size={20} />
            </div>
          }
        />
      </div>
    </div>
  );
}

export default Login;
