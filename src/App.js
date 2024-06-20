// File: src/App.jsx

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BoxLoader from "./components/utils/Loader/BoxLoader";
import "./index.css";
import "./fonts.css";

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

const EmpRelationCreate = lazy(() =>
  import("./components/EmployeeRelation/EmpRelationCreate")
);
const EmpRelationEdit = lazy(() =>
  import("./components/EmployeeRelation/EmpRelationEdit")
);
const EmpRelationDelete = lazy(() =>
  import("./components/EmployeeRelation/EmpRelationDelete")
);

const Home = lazy(() => import("./components/static/Home"));
const Menu = lazy(() => import("./components/static/Menu"));

function App() {
  return (
    <Suspense fallback={<BoxLoader />}>
      <Router>
        <Routes>
          {/* Employee Routes */}
          <Route path="/employee">
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
            <Route path="timetable/get/:id" element={<EmployeeSchedule />} />
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
          </Route>
          <Route path=":branch_id/section">
            <Route path="create" element={<SectionCreate />} />
            <Route path="edit">
              <Route path=":id" element={<SectionEdit />} />
            </Route>
            <Route path="delete">
              <Route path=":id" element={<SectionDelete />} />
            </Route>
            <Route path=":section_id">
              <Route path="timetable">
                <Route path="get" element={<TimetableGet />} />
                <Route path="edit" element={<TimetableEdit />} />
                <Route path="delete" element={<TimetableDelete />} />
              </Route>
            </Route>
          </Route>

          {/* Subject Routes */}
          <Route path="/subject">
            <Route path="create" element={<SubjectCreate />} />
            <Route path="edit">
              <Route path=":id" element={<SubjectEdit />} />
            </Route>
            <Route path="delete">
              <Route path=":id" element={<SubjectDelete />} />
            </Route>
          </Route>
          {/* Employee Relation Routes */}
          <Route path="/relation">
            <Route path="create" element={<EmpRelationCreate />} />
            <Route path="edit">
              <Route path=":id" element={<EmpRelationEdit />} />
            </Route>
            <Route path="delete">
              <Route path=":id" element={<EmpRelationDelete />} />
            </Route>
          </Route>
          {/* Default Route */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/loader" element={<BoxLoader />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;