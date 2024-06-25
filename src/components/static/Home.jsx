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
} from "react-icons/fa";
import CardSpotlight from "./../utils/CardSpotlight";
import hero_img from "../../assets/img/hero_img.png";
import hero_img_2 from "../../assets/img/hero_img_2.jpg";
import company from "./company.json";
import { PinContainer } from "../utils/aceternity/3dpin/PinContainer";
import { FaEnvelope } from "react-icons/fa6";
const Home = () => {
  return (
    <div>
      {/* Header */}
      <header className="flex z-10 fixed w-full justify-between items-center p-5 bg-gray-800 text-white">
        <div className="logo">
          <h1 className="text-2xl">SCH-COOK</h1>
        </div>
        <div className="auth-links">
          <Link to="/login" className="mr-4">
            Login
          </Link>
          <Link to="/signup">Signup</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero h-screen pt-20 p-0 bg-blue-500 text-white p-20 d-center">
        <div className="flex flex-col w-full p-5">
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
            <PinContainer
              children={[
                <div className="hero_img-cont flex w-52 h-52 overflow-hidden pointer-events-none">
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
      </section>

      {/* Features Section */}
      <section className="features p-10 h-screen bg-blue-300 overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-3xl">Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-card bg-blue-500 text-center p-5 border rounded-lg">
            <FaUserCog size={40} className="mb-4 mx-auto" />
            <h3 className="text-xl mb-2">Employee Management</h3>
            <p>Manage employee details and schedules with ease.</p>
          </div>
          <div className="feature-card bg-blue-500 text-center p-5 border rounded-lg">
            <FaBuilding size={40} className="mb-4 mx-auto" />
            <h3 className="text-xl mb-2">Branch Management</h3>
            <p>Handle multiple branches and their respective sections.</p>
          </div>
          <div className="feature-card bg-blue-500 text-center p-5 border rounded-lg">
            <FaListAlt size={40} className="mb-4 mx-auto" />
            <h3 className="text-xl mb-2">Section Management</h3>
            <p>Organize sections within each branch seamlessly.</p>
          </div>
          <div className="feature-card bg-blue-500 text-center p-5 border rounded-lg">
            <FaTable size={40} className="mb-4 mx-auto" />
            <h3 className="text-xl mb-2">Timetable Creation</h3>
            <p>Create and manage timetables efficiently.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-dark  p-5 text-center">
        <div className="links font-I mb-4 d-center ">
          <Link to="/privacy" className="mr-4">
            Privacy Policy
          </Link>
          <Link to="/terms" className="mr-4">
            Terms of Service
          </Link>
          <Link to="/support">Support</Link>
        </div>
        <div className="contact-info d-center flex-col gap-2">
          <Link className="d-center gap-2" to={"mailto://" + company.email}>
            <FaEnvelope size={20} />
            <span className="font-code">{company.email}</span>
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
      </footer>
    </div>
  );
};

export default Home;
