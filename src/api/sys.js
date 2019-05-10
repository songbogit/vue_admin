import {getRequest, postRequest, postJson} from "../libs/axios";
/**
 * 菜单
 */
export const permissionSave = (params) => {
  return postJson('/sys/permission/save', params);
};
export const permissionList = (params) => {
  return getRequest('/sys/permission/getAllList', params);
};
export const permissionDelete = (params) => {
  return postRequest(`/sys/permission/delByIds/${params.join(',')}`);
};
/**
 * 用户
 */
export const userAdd = (params) => {
  return postJson('/sys/user/add', params);
};
export const userDelete = (params) => {
  return postRequest(`/sys/user/delByIds/${params.join(',')}`);
};
export const userEdit = (params) => {
  return postJson('/sys/user/edit', params);
};
export const userEditStatus = (params) => {
  return postRequest('/sys/user/editStatus', params);
};
export const userList = (params) => {
  return getRequest('/sys/user/getByCondition', params);
};
export const userInfo = (params) => {
  return getRequest('/sys/user/getUserInfo', params);
};
/**
 * 角色
 */
export const roleAdd = (params) => {
  return postJson('/sys/role/add', params);
};
export const roleDelete = (params) => {
  return postRequest(`/sys/role/delAllByIds/${params.join(',')}`);
};
export const roleEdit = (params) => {
  return postJson('/sys/role/edit', params);
};
export const roleEditPerm = (params) => {
  return postRequest('/sys/role/editRolePerm', params);
};
export const roleList = (params) => {
  return getRequest('/sys/role/getAllList', params);
};
export const rolePageList = (params) => {
  return getRequest('/sys/role/getRoleByPage', params);
};
