import React, { useEffect, useState } from "react";
import org from "../../utils/org";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function OrgSingle() {
  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      const response = await org.getMyOrg();
      console.log(response.data);
      const { name, org_id: organization_id, admin } = response.data;
      setName(name);
      setOrganizationId(organization_id);
      setAdmin(admin)
    } catch (error) {
      console.error("Error fetching organization:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-4">My Organization</h1>
      <div className="details flex flex-col gap-5">
        <div className="flex flex-col items-left">
          <label className="font-I select-none">name</label>
          <h1 className="text-4xl font-M">{name}</h1>
        </div>
        <div className="flex flex-col items-left">
          <label className="font-I select-none">organization id</label>
          <h1 className="text-4xl font-M">{organizationId}</h1>
        </div>
        <div className="flex flex-col items-left">
          <label className="font-I select-none">admin</label>
          <h1 className="text-4xl font-M">{admin?.username}</h1>
        </div>
      </div>

      <div className="fixed bottom-0 d-center w-full gap-4 p-4">
        <Link to={"../edit"} className="btn">
          <FaEdit size={40} />
        </Link>
        <Link to={"../delete"} className="btn">
          <FaTrashAlt size={40} />
        </Link>
      </div>
    </div>
  );
}

export default OrgSingle;
