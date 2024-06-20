import React from "react";
import { Link } from "react-router-dom";

const routes = {
  employee: {
    create: "/employee/create",
    edit: "/employee/edit/:id",
    delete: "/employee/delete/:id",
    get: "/employee/get",
    id: "/employee/get/:id",
    schedule: "/employee/timetable/get/:id",
  },
  branch: {
    create: "/branch/create",
    edit: "/branch/edit/:id",
    delete: "/branch/delete/:id",
    get: "/branch/get",
    id: "/branch/get/:id",
  },
  branchcode: {
    create: "/branchcode/create",
    edit: "/branchcode/edit/:branch_code",
    delete: "/branchcode/delete/:branch_code",
    get: "/branchcode/get",
    id: "/branchcode/get/:branch_code",
  },
  section: {
    create: "/branch/:branch_id/section/create",
    edit: "/branch/:branch_id/section/edit/:id",
    delete: "/branch/:branch_id/section/delete/:id",
    get: "/branch/:branch_id/section/:section_id/timetable/get",
    edit: "/branch/:branch_id/section/:section_id/timetable/edit",
    delete: "/branch/:branch_id/section/:section_id/timetable/delete",
  },
  subject: {
    create: "/subject/create",
    edit: "/subject/edit/:id",
    delete: "/subject/delete/:id",
  },
  relation: {
    create: "/relation/create",
    edit: "/relation/edit/:id",
    delete: "/relation/delete/:id",
  },
  general: {
    home: "/",
    menu: "/menu",
    loader: "/loader",
  },
};
function LinkBtn({ name, to }) {
  return (
    <Link to={to} className={"btn " + (to.includes(":") ? "disabled" : "")}>
      {name}
    </Link>
  );
}
function Card({ title, val }) {
  return (
    <div className="card flex flex-col gap-2">
      <h2>{title}</h2>
      <div className="flex flex-wrap gap-2">
        {Object.keys(val).map((e, i) => (
          <LinkBtn key={i} to={val[e]} name={e} />
        ))}
      </div>
    </div>
  );
}
function Menu() {
  return (
    <main>
      <h1 className="text-2xl">Menu</h1>
      <div className="cards mt-4 flex flex-col w-full gap-2">
        {Object.keys(routes).map((e, i) => (
          <Card key={i} title={e} val={routes[e]} />
        ))}
      </div>
    </main>
  );
}

export default Menu;
