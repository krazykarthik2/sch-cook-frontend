import axios from "axios";
import backend from "./backend.json";
const URLbase = backend.URLbase;
async function create(branch_id, { name, sec_id }) {
  let opt = {};
  [(name, sec_id)]
    .filter((e) => e)
    .forEach((e) => {
      opt = { e, ...opt };
    });
  return await axios.post(URLbase + `/branch/${branch_id}/section/create`, opt);
}
async function edit(branch_id,sec_id, { name }) {
  let opt = {};
  [name]
    .filter((e) => e)
    .forEach((e) => {
      opt = { e, ...opt };
    });
  return await axios.put(
    URLbase + `/branch/${branch_id}/section/edit/${sec_id}`,
    opt
  );
}
const section = { create, edit };
export default section;
