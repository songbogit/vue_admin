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
