import axios from "axios";
import backend from "./backend.json";
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
const timetable = { create, edit };
export default timetable;
