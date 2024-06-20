import axios from "axios";
import backend from "./backend.json";
const URLbase = backend.URLbase;
async function create({ name,emp_id }) {
  let opt = {name:name,emp_id:emp_id}
  return await axios.post(URLbase + `/employee/create`, opt);
}
async function getAll(){
  return await axios.get(URLbase + `/employee/get`);
}
async function get(id) {
  return await axios.get(URLbase +`/employee/get/${id}`);
}
async function edit(id, { name }) {
  let opt = {name:name};
  return await axios.post(URLbase + `/employee/edit/${id}`, opt);
}
async function schedule_get(id){
    return await axios.get(URLbase + `/employee/timetable/get/${id}`);
}
const schedule={get:schedule_get}
const employee = { create, get,getAll ,edit,schedule};
export default employee;
