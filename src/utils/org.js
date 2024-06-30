// File: src/utils/org.js

import axios from "axios";
import backend from "./backend.js";
const URLbase = backend.URLbase;

async function getAll() {
  return await axios.get(URLbase + `/organization/get`);
}
// Function to create an organization with admin credentials
async function create({
  name,
  organization_id,
  admin_username,
  admin_password,
}) {
  return await axios.post(URLbase + `/organization/create`, {
    name,
    org_id: organization_id,
    admin_username,
    admin_password,
  });
}

// Function to edit an organization
async function edit({ name }) {
  return await axios.post(URLbase + `/organization/edit_mine`, {
    name,
  });
}

// Function to delete an organization forever
async function _delete() {
  return await axios.delete(URLbase + `/organization/delete_mine`);
}
async function getMyOrg() {
  return await axios.get(URLbase + `/organization/get_mine`);
}
async function get(org_id) {
  return await axios.get(URLbase + `/organization/get/${org_id}`);
}
async function editAsGov(id, { name }) {
  return await axios.post(URLbase + `/organization/edit/${id}`, {
    name,
  });
}

// Function to delete an organization forever
async function deleteAsGov(id) {
  return await axios.delete(URLbase + `/organization/delete/${id}`);
}
const org = { getAll, get, create, edit, _delete, getMyOrg,editAsGov,deleteAsGov };
export default org;
