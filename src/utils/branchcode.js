import axios from "axios";
import backend from "./backend.json";
const URLbase = backend.URLbase;
async function create({ name, branch_code }) {
  let opt = {
    name: name,
    branch_code: branch_code,
  };
  return await axios.post(URLbase + `/branchcode/create`, opt);
}
async function getAll() {
  return await axios.get(URLbase + `/branchcode/get`);
}
async function get(branch_code) {
  return await axios.get(URLbase + `/branchcode/get/${branch_code}`);
}
async function edit(branch_code, { name}) {
  let opt = {
    name: name,
  };
  return await axios.post(URLbase + `/branchcode/edit/${branch_code}`, opt);
}
async function _delete(branch_code){
  return await axios.delete(URLbase + `/branchcode/delete/${branch_code}`)
}
const branchcode = { create, get, getAll, edit,_delete };
export default branchcode;
