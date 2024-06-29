import axios from "axios";
import backend from "./backend.js";
const URLbase = backend.URLbase;
async function create({ year, branch_code, branch_id }) {
  return await axios.post(URLbase + `/branch/create`, {
    year,
    branch_id,
    branch_code,
  });
}
async function getAll() {
  return await axios.get(URLbase + `/branch/get_simple`);
}
async function get(id) {
  return await axios.get(URLbase + `/branch/get/${id}`);
}
async function edit(id, { year, branch_code, branch_id }) {
  return await axios.post(URLbase + `/branch/edit/${id}`, {
    year,
    branch_id,
    branch_code,
  });
}
const branch = { create, get, getAll, edit };
export default branch;
