import axios from "axios";
import backend from "./backend.js";
const URLbase = backend.URLbase;
async function create(branch_id, { name, sec_id }) {
  return await axios.post(URLbase + `/branch/${branch_id}/section/create`, {
    name,
    sec_id,
  });
}

async function edit(branch_id, sec_id, { name }) {
  return await axios.post(
    URLbase + `/branch/${branch_id}/section/edit/${sec_id}`,
    { name }
  );
}
async function _delete(branch_id, sec_id) {
  return await axios.delete(
    URLbase + `/branch/${branch_id}/section/delete/${sec_id}`
  );
}
const section = { create, edit, _delete };
export default section;
