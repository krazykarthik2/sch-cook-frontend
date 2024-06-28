import axios from "axios";
import backend from "./backend.json";

window.def = axios.defaults;
window.axios = axios

const URLbase = backend.URLbase;
window.def = axios.defaults;
// Function to login
async function login(username, password) {
  const params = {
    username: username,
    password: password,
  };
  console.log(params);
  return await axios.post(URLbase + `/auth/login`, params);
}
async function loginWithJWT(jwt) {
  return await axios.post(
    URLbase + `/auth/login/jwt`,
    {},
    {
      headers: { "x-auth-token": jwt },
    }
  );
}
// Function to add an admin login
async function addAdminLogin(username, password) {
  return await axios.post(URLbase + `/auth/addAdminLogin`, {
    username,
    password,
  });
}

// Function to add a viewer login
async function addViewerLogin(username, password) {
  return await axios.post(URLbase + `/auth/addViewerLogin`, {
    username,
    password,
  });
}

// Function to delete a user
async function deleteUser(id) {
  return await axios.delete(URLbase + `/auth/deleteUser/${id}`);
}
async function useJWT(jwt){
  const result__ = await loginWithJWT(jwt);
  if(result__.data.user){
    axios.defaults.headers.common['x-auth-token']= jwt;
    return result__;
  }else{
    axios.defaults.headers.common['x-auth-token']=null;
    return null;
  }
}
const auth = {
  login,
  loginWithJWT,
  useJWT,
  addAdminLogin,
  addViewerLogin,
  deleteUser,
};

export default auth;
