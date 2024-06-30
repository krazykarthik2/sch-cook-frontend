import React from "react";
import { Outlet } from "react-router-dom";
import AuthWall from "./components/static/AuthWall"
import AuthRoleWall from "./components/static/AuthRoleWall"
export function ProtectAuth({loggedIn}) {
  return <>{loggedIn||window.location.pathname=="/"?<Outlet />:<AuthWall/>}</>;
}
export function ProtectAuthRole({role,permit=[]}){
  return <>{permit.includes(role)||window.location.pathname=="/"?<Outlet />:<AuthRoleWall/>}</>;
}