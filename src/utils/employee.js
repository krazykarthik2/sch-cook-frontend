import axios from "axios";
import backend from "./backend.json";
const URLbase = backend.URLbase;
async function create({ name,emp_id }) {
  let opt = {};
  [(name,emp_id)]
    .filter((e) => e)
    .forEach((e) => {
      opt = { e, ...opt };
    });
  return await axios.post(URLbase + `/employee/create`, opt);
}
async function getAll(){
  return await axios.get(URLbase + `/employee/get`);
}
async function get(id) {
  return await axios.get(URLbase +`/employee/get/${id}`);
}
async function edit(id, { name }) {
  let opt = {};
  [(name)]
    .filter((e) => e)
    .forEach((e) => {
      opt = { e, ...opt };
    });
    return await axios.put(URLbase + `/employee/edit/${id}`, opt);
}
async function schedule_get(id){
    return await axios.get(URLbase + `/employee/schedule/get/${id}`);
}
const schedule={get:schedule_get}
const employee = { create, get,getAll ,edit,schedule};
export default employee;
