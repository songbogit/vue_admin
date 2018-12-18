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

// 查看模板详情
export const getTemplateDetail = (params, id) => {
  return getRequest('/page/template/templatePreview/' + id, params);
}

// 删除模板的模块
export const deleteTemplateBlock = (params) => {
  return postRequest('/page/template/deleteTemplateLayout', params);
}

// 排序模板中的模块
export const sortTemplateBlock = (params) => {
  return postRequest('/page/template/sortTemplateBlocks', params);
}

// 添加模板模块
export const addTemplateBlock = (params) => {
  return postRequest('/page/template/insertTemplateLayout', params);
}
