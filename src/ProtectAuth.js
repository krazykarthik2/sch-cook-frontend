import React from "react";
import { Outlet } from "react-router-dom";
import AuthWall from "./components/static/AuthWall"
export function ProtectAuth({auth}) {
  
  return <>{auth.isLoggedIn()||window.location.pathname=="/"?<Outlet />:<AuthWall/>}</>;
}
