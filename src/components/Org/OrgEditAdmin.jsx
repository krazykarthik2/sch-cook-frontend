// File: src/components/OrgEdit.jsx

import React, { useState, useEffect } from "react";
import org from "../../utils/org";

const OrgEditAdmin = () => {
  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      const response = await org.getMyOrg();
      const { name, org_id: organization_id } = response.data;
      setName(name);
      setOrganizationId(organization_id);
    } catch (error) {
      console.error("Error fetching organization:", error);
    }
  };

  const handleEdit = async () => {
    toastThis(
      () =>
        org.edit({
          name,
        }),
      () => {},
      {
        pending: `Modifying Organization ${organizationId}`,
        error: `Error modifying Organization ${organizationId}`,
        success: `Organization ${organizationId} modified successfully`,
      }
    );
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-4">Edit Organization</h1>
      <input
        type="text"
        placeholder="Organization Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <div>{organizationId}</div>

      <button
        onClick={handleEdit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Organization
      </button>
    </div>
  );
};

export default OrgEditAdmin;
