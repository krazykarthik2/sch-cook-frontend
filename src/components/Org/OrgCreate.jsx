// File: src/components/CreateOrg.jsx

import React, { useState } from "react";
import org from "../../utils/org";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toastThis } from "../../utils/fx";

const OrgCreate = () => {
  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);

  const handleCreateOrg = async () => {
    
      toastThis(
        () =>
          org.create({
            name,
            organization_id: organizationId,
            admin_username: adminUsername,
            admin_password: adminPassword,
          }),
        () => {
        },
        {
          pending: `Creating Organization ${id}`,
          error: `Error creating organization ${id}`,
          success: `Organization ${id} created successfully`,
        }
      );
  
  };

  return (
    <div className="p-5 flex flex-col gap-3">
      <h1 className="text-2xl ">Create Organization</h1>
      <input
        type="text"
        placeholder="Organization Name"
        value={name}
        autoComplete={false}
        onChange={(e) => setName(e.target.value)}
        className="border p-2  w-full"
      />
      <input
        type="text"
        placeholder="Organization ID"
        value={organizationId}
        autoComplete={false}
        onChange={(e) => setOrganizationId(e.target.value)}
        className="border p-2  w-full"
      />
      <input
        type="text"
        placeholder="Admin Username"
        value={adminUsername}
        autoComplete={false}
        onChange={(e) => setAdminUsername(e.target.value)}
        className="border p-2  w-full"
      />
      <div className="flex justify-between gap-3">
        <input
          type={isPassVisible ? "text" : "password"}
          placeholder="Admin Password"
          value={adminPassword}
          autoComplete={false}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="border p-2  w-full"
        />
        <button
          tabIndex={-1}
          className="unbtn"
          onClick={() => {
            setIsPassVisible((e) => {
              return !e;
            });
          }}
          accessKey="i"
        >
          {!isPassVisible ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
        </button>
      </div>

      <button
        onClick={handleCreateOrg}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Organization
      </button>
    </div>
  );
};

export default OrgCreate;
