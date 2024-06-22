import axios from "axios";
import backend from "./backend.json";
import { unique } from "./fx";
const URLbase = backend.URLbase;
async function create({ subject_id, name }) {
  return await axios.post(URLbase + `/subject/create`, { name, subject_id });
}
async function getSome(arr) {
  return await axios.post(URLbase + `/subject/get`, { get: unique(arr) });
}
async function getAll(arr) {
  if (arr) {
    if (arr.length) return await getSome(arr);
  } else return await axios.get(URLbase + `/subject/get`);
}
async function get(id) {
  return await axios.get(URLbase + `/subject/get/${id}`);
}
async function edit(id, { name }) {
  return await axios.post(URLbase + `/subject/edit/${id}`, { name });
}

async function _delete(id) {
  return await axios.delete(URLbase + `/subject/delete/${id}`);
}
const subject = { create, get, getAll, edit, _delete };
export default subject;
