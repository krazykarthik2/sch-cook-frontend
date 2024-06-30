// File: src/App.jsx

import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProtectAuth, ProtectAuthRole } from "./ProtectAuth";
import Terminal from "./components/Terminal";
import E404 from "./components/static/E404";
import BoxLoader from "./components/utils/Loader/BoxLoader";
import "./fonts.css";
import "./index.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import auth from "./utils/auth";
const SubjectList = lazy(() => import("./components/Subject/SubjectList"));
const SubjectSingle = lazy(() => import("./components/Subject/SubjectSingle"));
const EmpRelationSingle = lazy(() =>
  import("./components/EmployeeRelation/EmpRelationSingle")
);
const BranchcodeCreate = lazy(() =>
  import("./components/Branchcode/BranchcodeCreate")
);
const BranchcodeDelete = lazy(() =>
  import("./components/Branchcode/BranchcodeDelete")
);
const BranchcodeEdit = lazy(() =>
  import("./components/Branchcode/BranchcodeEdit")
);
const BranchcodeSingle = lazy(() =>
  import("./components/Branchcode/BranchcodeSingle")
);
const BranchcodeList = lazy(() =>
  import("./components/Branchcode/BranchcodeList")
);

// Lazy load components
const EmployeeCreate = lazy(() =>
  import("./components/Employee/EmployeeCreate")
);
const EmployeeEdit = lazy(() => import("./components/Employee/EmployeeEdit"));
const EmployeeDelete = lazy(() =>
  import("./components/Employee/EmployeeDelete")
);
const EmployeeList = lazy(() => import("./components/Employee/EmployeeList"));
const EmployeeSingle = lazy(() =>
  import("./components/Employee/EmployeeSingle")
);
const EmployeeSchedule = lazy(() =>
  import("./components/Employee/EmployeeSchedule")
);

const BranchCreate = lazy(() => import("./components/Branch/BranchCreate"));
const BranchEdit = lazy(() => import("./components/Branch/BranchEdit"));
const BranchDelete = lazy(() => import("./components/Branch/BranchDelete"));
const BranchList = lazy(() => import("./components/Branch/BranchList"));
const BranchSingle = lazy(() => import("./components/Branch/BranchSingle"));

const SectionsGet = lazy(() => import("./components/Section/SectionsGet"));
const SectionCreate = lazy(() => import("./components/Section/SectionCreate"));
const SectionEdit = lazy(() => import("./components/Section/SectionEdit"));
const SectionDelete = lazy(() => import("./components/Section/SectionDelete"));

const TimetableGet = lazy(() => import("./components/Timetable/TimetableGet"));
const TimetableEdit = lazy(() =>
  import("./components/Timetable/TimetableEdit")
);
const TimetableDelete = lazy(() =>
  import("./components/Timetable/TimetableDelete")
);

const SubjectCreate = lazy(() => import("./components/Subject/SubjectCreate"));
const SubjectEdit = lazy(() => import("./components/Subject/SubjectEdit"));
const SubjectDelete = lazy(() => import("./components/Subject/SubjectDelete"));

const EmpRelationGet = lazy(() =>
  import("./components/EmployeeRelation/EmpRelationGet")
);
const EmpRelationCreate = lazy(() =>
  import("./components/EmployeeRelation/EmpRelationCreate")
);
const EmpRelationEdit = lazy(() =>
  import("./components/EmployeeRelation/EmpRelationEdit")
);
const EmpRelationDelete = lazy(() =>
  import("./components/EmployeeRelation/EmpRelationDelete")
);
const OrgCreate =  lazy(()=>import("./components/Org/OrgCreate")); 

const Home = lazy(() => import("./components/static/Home"));
const Menu = lazy(() => import("./components/static/Menu"));
const Welcome = lazy(() => import("./components/static/Welcome"));

const Login = lazy(() => import("./components/Auth/Login"));
const Signup = lazy(() => import("./components/Auth/SignUp"));

function App() {
  useEffect(() => {
    document.onfullscreenchange = (e) => {
      console.log("full screen changed");
      console.log(window.isFullscreen);
      console.log(e);
    };
  }, []);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [username, setUsername] = useState("");
  const [userRole,setUserRole] = useState("")
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const jwtCookie = cookies.jwt;
    window.cookies = cookies;
    if (jwtCookie) {
      auth
        .useJWT(jwtCookie)
        .then((response) => {
          setUsername(response.data.user.username);
          setUserRole(response.data.user.role)
          setLoggedIn(true);
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
          // Optional: Handle invalid or expired JWT token
          removeCookie("jwt");
        });
    }
  }, [cookies.jwt, removeCookie]);

  const setLoginCookie = (jwtToken) => {
    setCookie("jwt", jwtToken, { path: "/" });
  };
  function handleLogin({ token, user }) {
    setLoginCookie(token);
          setUserRole(user.role)
          setUsername(user.username);
  }

  const handleLogout = () => {
    removeCookie("jwt");
    setLoggedIn(false);
    setUsername("");
          setUserRole("")
        };
  return (
    <>
      <Suspense fallback={<BoxLoader />}>
        <Router>
          <Routes>
            <Route path="" element={<ProtectAuth loggedIn={loggedIn} />}>
            <Route path="gov" element={<ProtectAuthRole role={userRole} permit={["governer"]}/>}>
              <Route path="org" >
                <Route path="create" element={<OrgCreate />}/>
              </Route>
            </Route>
              <Route path="/welcome" element={<Welcome username={username} />} />
              {/* Employee Routes */}
              <Route path="employee">
                <Route path="create" element={<EmployeeCreate />} />
                <Route path="edit">
                  <Route path=":id" element={<EmployeeEdit />} />
                </Route>
                <Route path="delete">
                  <Route path=":id" element={<EmployeeDelete />} />
                </Route>
                <Route path="get">
                  <Route path="" element={<EmployeeList />} />
                  <Route path=":id" element={<EmployeeSingle />} />
                </Route>
                <Route
                  path="timetable/get/:id"
                  element={<EmployeeSchedule />}
                />
              </Route>

              {/* Branch Routes */}
              <Route path="branch">
                <Route path="create" element={<BranchCreate />} />
                <Route path="edit">
                  <Route path=":id" element={<BranchEdit />} />
                </Route>
                <Route path="delete">
                  <Route path=":id" element={<BranchDelete />} />
                </Route>
                <Route path="get">
                  <Route path="" element={<BranchList />} />
                  <Route path=":id" element={<BranchSingle />} />
                </Route>

                <Route path=":branch_id/section">
                  <Route path="" element={<SectionsGet />} />
                  <Route path="create" element={<SectionCreate />} />
                  <Route path="edit">
                    <Route path=":section_id" element={<SectionEdit />} />
                  </Route>
                  <Route path="delete">
                    <Route path=":section_id" element={<SectionDelete />} />
                  </Route>
                  <Route path=":section_id">
                    <Route path="timetable">
                      <Route path="get" element={<TimetableGet />} />
                      <Route path="edit" element={<TimetableEdit />} />
                      <Route path="delete" element={<TimetableDelete />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
              <Route path="branchcode">
                <Route path="create" element={<BranchcodeCreate />} />
                <Route path="edit">
                  <Route path=":branch_code" element={<BranchcodeEdit />} />
                </Route>
                <Route path="delete">
                  <Route path=":branch_code" element={<BranchcodeDelete />} />
                </Route>
                <Route path="get">
                  <Route path="" element={<BranchcodeList />} />
                  <Route path=":branch_code" element={<BranchcodeSingle />} />
                </Route>
              </Route>
              {/* Subject Routes */}
              <Route path="subject">
                <Route path="get">
                  <Route path="" element={<SubjectList />} />
                  <Route path=":id" element={<SubjectSingle />} />
                </Route>
                <Route path="create" element={<SubjectCreate />} />
                <Route path="edit">
                  <Route path=":id" element={<SubjectEdit />} />
                </Route>
                <Route path="delete">
                  <Route path=":id" element={<SubjectDelete />} />
                </Route>
              </Route>
              {/* Employee Relation Routes */}
              <Route path="relation">
                <Route path="get">
                  <Route path="" element={<EmpRelationGet />} />
                  <Route path=":id" element={<EmpRelationSingle />} />
                </Route>
                <Route path="create" element={<EmpRelationCreate />} />
                <Route path="edit">
                  <Route path=":id" element={<EmpRelationEdit />} />
                </Route>
                <Route path="delete">
                  <Route path=":id" element={<EmpRelationDelete />} />
                </Route>
              </Route>
              <Route path="/" element={<Home loggedIn={loggedIn} handleLogout={handleLogout}/>} />
              {/* Exception for home route */}
            </Route>
            {/* Default Route */}
            <Route path="/menu" element={<Menu />} />
            <Route path="/loader" element={<BoxLoader />} />
            <Route path="/auth">
              <Route
                path="login"
                element={
                  <Login handleLogin={handleLogin} loggedIn={loggedIn} />
                }
              />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route path="*" element={<E404 />} />
          </Routes>

          <Terminal loggedIn={loggedIn} userRole={userRole}/>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
