// File: src/utils/org.js

import axios from "axios";
import backend from "./backend.js";
const URLbase = backend.URLbase;

// Function to create an organization with admin credentials
async function create({ name, organization_id, admin_username, admin_password }) {
  return await axios.post(URLbase + `/organization/create`, {
    name,
    org_id:organization_id,
    admin_username,
    admin_password,
  });
}

// Function to edit an organization
async function edit(id, { name, organization_id }) {
  return await axios.put(URLbase + `/organization/edit/${id}`, {
    name,
    org_id:organization_id,
  });
}

// Function to delete an organization forever
async function _delete(id) {
  return await axios.delete(URLbase + `/organization/delete/${id}`);
}

const org = { create, edit, _delete };
export default org;
