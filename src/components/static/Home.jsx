// File: src/components/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserCog,
  FaBuilding,
  FaListAlt,
  FaTable,
  FaAt,
  FaLinkedin,
  FaInstagram,
  FaCopyright,
} from "react-icons/fa";
import CardSpotlight from "./../utils/CardSpotlight";
import hero_img from "../../assets/img/hero_img.png";
import hero_img_2 from "../../assets/img/hero_img_2.jpg";
import company from "./company.json";
import { PinContainer } from "../utils/aceternity/3dpin/PinContainer";
import { FaEnvelope, FaLink, FaRegCopyright } from "react-icons/fa6";
import BackgroundCellAnimation from "../utils/aceternity/BackgroundCellAnimation";
import brand_identity_light from "../../assets/img/brand_identity_light.png"
const Home = () => {
  return (
    <div className="w-full h-full d-center">
      <div>
        {/* Header */}
        <header className="flex z-10 fixed w-full justify-between items-center p-5 bg-transparent-glass-md text-white">
          <div className="logo">
            <h1 className="text-2xl">asw-1ni</h1>
          </div>
          <div className="d-center gap-3 h2">
            <Link to="/auth/login">Login</Link>
            <Link to="/auth/signup">Signup</Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero h-screen pt-20 select-none !bg-transparent text-white p-3 d-center">
          <div className="flex flex-col w-full ">
            <h1 className="text-4xl mb-4">Time Table Cooker</h1>
            <div className="flex w-full justify-between items-center flex-wrap-reverse">
              <div className="flex flex-col h-full justify-between">
                <p className="text-xl flex-grow h-full p-4">
                  Effortlessly manage schedules for employees and branches
                  <br />
                  with ease <br />
                  like a breeze
                </p>
                <div className="flex flex-col items-start p-3 gap-2">
                  <Link
                    to="/get-started"
                    className="btn bg-white text-blue-500 px-4 py-2 rounded "
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/guides"
                    className="btn bg-white text-blue-500 px-4 py-2 rounded"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="pointer-events-none md:!pointer-events-auto">
                <PinContainer
                  children={[
                    <div
                      key={1}
                      className="hero_img-cont  flex w-52 h-52 overflow-hidden pointer-events-none"
                    >
                      <img src={hero_img} alt="clock" className="scale-125" />
                    </div>,
                  ]}
                  title={
                    <div className="w-36 h-36 d-center">
                      <img src={hero_img_2} alt="hero_alt" />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features select-none p-10 h-screen bg-transparent-glass-sm border border-gray-600 text-white overflow-hidden">
          <div className="text-center mb-8">
            <h2 className="text-3xl">Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card bg-frosted-glass-md text-center p-5 border rounded-lg">
              <FaUserCog size={40} className="mb-4 mx-auto" />
              <h3 className="text-xl mb-2">Employee Management</h3>
              <p>Manage employee details and schedules with ease.</p>
            </div>
            <div className="feature-card bg-frosted-glass-md text-center p-5 border rounded-lg">
              <FaBuilding size={40} className="mb-4 mx-auto" />
              <h3 className="text-xl mb-2">Branch Management</h3>
              <p>Handle multiple branches and their respective sections.</p>
            </div>
            <div className="feature-card bg-frosted-glass-md text-center p-5 border rounded-lg">
              <FaListAlt size={40} className="mb-4 mx-auto" />
              <h3 className="text-xl mb-2">Section Management</h3>
              <p>Organize sections within each branch seamlessly.</p>
            </div>
            <div className="feature-card bg-frosted-glass-md text-center p-5 border rounded-lg">
              <FaTable size={40} className="mb-4 mx-auto" />
              <h3 className="text-xl mb-2">Timetable Creation</h3>
              <p>Create and manage timetables efficiently.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white text-dark text-center md:p-5 p-2">
          <div className="top_row d-center justify-between  flex-wrap gap-4 gap-y-5">
            <div className="left">
              <img src={brand_identity_light} width={200} height={200}/>
            </div>
            <div className="right flex-grow flex justify-between flex-wrap gap-y-5">
            <div className="links d-center h-full">
              <div className="links font-I flex h-full flex-col items-start">
                <Link to="/privacy" className="whitespace-nowrap">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="whitespace-nowrap">
                  Terms of Service
                </Link>
                <Link to="/support" className="whitespace-nowrap">Support</Link>
              </div>
            </div>

            <div className="contact d-center flex-col h-full flex-grow">
              <div className="contact-info flex items-end flex-col gap-2">
                <Link
                  className="d-center gap-2"
                  to={"mailto://" + company.email}
                >
                  <FaEnvelope size={20} />
                  <span className="font-code flex md:!flex-row flex-col text-right">
                    <div>{company.email.split("@")[0]}@</div>
                    
                    <div>{company.email.split("@")[1]}</div>
                  </span>
                </Link>
                <div className="d-center gap-3">
                  <Link to={company.socials.linkedIn}>
                    <FaLinkedin size={35} />
                  </Link>{" "}
                  <Link to={company.socials.instagram}>
                    <FaInstagram size={35} />
                  </Link>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className="bottom_row">
            <div className="copy-right-details d-center gap-2 flex-wrap">
              <FaRegCopyright size={21} />
              <span>realKrazy.2022</span>
            </div>
          </div>
        </footer>
      </div>
      <BackgroundCellAnimation />
    </div>
  );
};

export default Home;
