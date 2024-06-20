import axios from "axios";
import backend from "./backend.json";
const URLbase = backend.URLbase;
async function create({ subject_id, subject_name }) {
  let opt = {};
  [(subject_id, subject_name)]
    .filter((e) => e)
    .forEach((e) => {
      opt = { e, ...opt };
    });
  return await axios.post(URLbase + `/subject/create`, opt);
}
async function getAll() {
  return await axios.get(URLbase + `/subject/get`);
}
async function get(id) {
  return await axios.get(URLbase + `/subject/get/${id}`);
}
async function edit(id, { subject_name }) {
  let opt = {};
  [subject_name]
    .filter((e) => e)
    .forEach((e) => {
      opt = { e, ...opt };
    });
  return await axios.put(URLbase + `/subject/edit/${id}`, opt);
}
const subject = { create, get, getAll, edit };
export default subject;
