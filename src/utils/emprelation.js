import axios from "axios";
import backend from "./backend.json";
import { unique } from "./fx";
const URLbase = backend.URLbase;
async function create({ emp_id, branch_id, sec_id, subject_id }) {
  return await axios.post(URLbase + `/relation/create`, {
    emp_id,
    branch_id,
    sec_id,
    subject_id,
  });
}
async function getSome(arr) {
  return await axios.post(URLbase + `/relation/get`, { get: unique(arr) });
}
async function getAll(arr) {
  if (arr) if (arr.length) if (arr.length > 0) return await getSome(arr);
  return await axios.get(URLbase + `/relation/get`);
}
async function get(id) {
  return await axios.get(URLbase + `/relation/get/${id}`);
}
async function edit(id, { emp_id, branch_id, sec_id, subject_id }) {
  return await axios.post(URLbase + `/relation/edit/${id}`, {
    emp_id,
    branch_id,
    sec_id,
    subject_id,
  });
}
async function _delete(id){
  return await axios.delete(URLbase+`/relation/delete/${id}`)
}
const emprelation = { create, get, getAll, edit,_delete };
export default emprelation;
