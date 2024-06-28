import React from "react";
import { Outlet } from "react-router-dom";
import AuthWall from "./components/static/AuthWall"
export function ProtectAuth({loggedIn}) {
  
  return <>{loggedIn||window.location.pathname=="/"?<Outlet />:<AuthWall/>}</>;
}
