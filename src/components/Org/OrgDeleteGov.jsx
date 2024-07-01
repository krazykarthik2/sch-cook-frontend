// File: src/components/OrgDeleteGov.jsx

import React, { useState, useEffect } from "react";
import org from "../../utils/org";
import { useParams } from "react-router-dom";
import { toastThis} from "../../utils/fx"
const OrgDeleteGov = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      const response = await org.get(id);
      const { name, org_id: organization_id } = response.data;
      setName(name);
      setOrganizationId(organization_id);
    } catch (error) {
      console.error("Error fetching organization:", error);
    }
  };

  const handleDelete = async () => {
    toastThis(()=> org.deleteAsGov(id),()=>{},{
      pending:`Deleting Organization ${organizationId}`,
      error:`Error deleting Organization ${organizationId}`,
      success:`Organization ${organizationId} deleted successfully`
    })
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
        Delete Organization as Governor
      </button>
    </div>
  );
};

export default OrgDeleteGov;
