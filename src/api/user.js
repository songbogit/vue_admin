import { getRequest, postRequest } from "../libs/axios";


export const login = (params) => {
  return postRequest('/login', params);
}

export const userLogout = (params) => {
  return postRequest('/logout', params);
}
