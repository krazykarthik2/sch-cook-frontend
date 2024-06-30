// File: src/components/OrgDeleteGov.jsx

import React, { useState, useEffect } from "react";
import org from "../../utils/org";

const OrgDeleteAdmin = () => {

  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      const response = await org.getMyOrg();
      const { name, org_id:organization_id } = response.data;
      setName(name);
      setOrganizationId(organization_id);
    } catch (error) {
      console.error("Error fetching organization:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await org._delete();
      setMessage("Organization deleted successfully!");
    } catch (error) {
      setMessage("Error deleting organization");
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-4">Delete Organization</h1>
      <div>
        <strong>Name:</strong> {name}
      </div>
      <div>
        <strong>Organization ID:</strong> {organizationId}
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Delete Organization as Admin
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default OrgDeleteAdmin;
