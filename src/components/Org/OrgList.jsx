// File: src/components/OrgView.jsx

import React, { useEffect, useState } from "react";
import org from "../../utils/org";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrgList = () => {
  const [organizations, setOrganizations] = useState([]);
  window.orgs = organizations;
  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await org.getAll();
      setOrganizations(response.data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await org._delete(id);
      setOrganizations(organizations.filter((org) => org._id !== id));
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-4">Organizations</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Organization ID</th>
            <th className="py-2 px-4 border-b">Admin Username</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org._id}>
              <td className="py-2 px-4 border-b">{org.name}</td>
              <td className="py-2 px-4 border-b">{org.org_id}</td>
              <td className="py-2 px-4 border-b">{org.admin.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Link
          to="/gov/org/create"
          className="flex items-center bg-red-600 fixed bottom-0 right-0 m-5 text-white rounded-md p-4"
        >
          <FaPlus size={40} />
        </Link>
      </div>
    </div>
  );
};

export default OrgList;
