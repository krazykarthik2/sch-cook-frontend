import axios from "axios";
import backend from "./backend.js";
import branch from "./branch";
const URLbase = backend.URLbase;
async function create(branch_id, section_id, timetable) {
  return await axios.post(
    URLbase + `/branch/${branch_id}/section/${section_id}/timetable/create`,
    { timetable }
  );
}
async function edit(branch_id, section_id, timetable) {
  return await axios.post(
    URLbase + `/branch/${branch_id}/section/${section_id}/timetable/edit`,
    { timetable }
  );
}
async function get(branch_id, section_id) {
  const response = await branch.get(branch_id);
  const branch__ = response.data;
  const section__ = branch__.sections.find((e) => e.sec_id == section_id);
  return section__.timetable;
}
const timetable = { create, edit, get };
export default timetable;
