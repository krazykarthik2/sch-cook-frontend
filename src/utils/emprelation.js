import axios from "axios";
import backend from "./backend.json";
const URLbase = backend.URLbase;
async function create({ emp_id, branch_id, sec_id, subject_id }) {
  let opt = {};
  [(emp_id, branch_id, sec_id, subject_id)]
    .filter((e) => e)
    .forEach((e) => {
      opt = { e, ...opt };
    });
  return await axios.post(URLbase + `/relation/create`, opt);
}
async function getAll() {
  return await axios.get(URLbase + `/relation/get`);
}
async function get(id) {
  return await axios.get(URLbase + `/relation/get/${id}`);
}
async function edit(id, {  emp_id, branch_id, sec_id, subject_id }) {
  let opt = {};
  [( emp_id, branch_id, sec_id, subject_id)]
    .filter((e) => e)
    .forEach((e) => {
      opt = { e, ...opt };
    });
    
  return await axios.post(URLbase + `/relation/edit/${id}`, opt);
}
const emprelation = { create, get, getAll, edit };
export default emprelation;
