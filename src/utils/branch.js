import axios from "axios";
import backend from "./backend.json";
const URLbase = backend.URLbase;
async function create({ name, branch_id }) {
  let opt = {};
  [(name, branch_id)]
    .filter((e) => e)
    .forEach((e) => {
      opt = { e, ...opt };
    });
  return await axios.post(URLbase + `/branch/create`, opt);
}
async function getAll(){
  return await axios.get(URLbase + `/branch/get`);
}
async function get(id) {
  return await axios.get(URLbase + `/branch/get/${id}`);
}
async function edit(id, { name, branch_id }) {
  let opt = {};
  [(name, branch_id)]
    .filter((e) => e)
    .forEach((e) => {
      opt = { e, ...opt };
    });
  return await axios.post(URLbase + `/branch/edit/${id}`, opt);
}
const branch = { create, get,getAll ,edit};
export default branch;
