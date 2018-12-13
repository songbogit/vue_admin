import { getRequest, postRequest } from '@/libs/axios';

// 页面分页
export const pageList = (params) => {
  return getRequest('/page/management/list', params);
}

// 新建页面
export const addPage = (params) => {
  return postRequest('/page/management/createInstance', params);
}

// 模板分页
export const pageTemplateList = (params) => {
  return getRequest('/page/template/list', params);
}

// 获取所有模块
export const getAllBlock = (params) => {
  return getRequest('/page/template/getAllBlocks', params);
}
