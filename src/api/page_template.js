import { getRequest, postRequest, postJson } from '@/libs/axios';

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

// 创建模板
export const createTemplate = (params) => {
  return postJson('/page/template/create', params);
}


/**
 * 模板编辑
 * @param params
 * @returns {*}
 */
// 获取所有模块
export const getAllBlock = (params) => {
  return getRequest('/page/template/getAllBlocks', params);
}

// 查看模板详情
export const getTemplateDetail = (params, id) => {
  return getRequest('/page/template/templatePreview/' + id, params);
}

// 更新模板
export const updateTemplate = (params) => {
  return postRequest('/page/template/update', params);
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

/**
 * 页面编辑
 * @param params
 * @param id
 * @returns {*}
 */
// 获取页面详情
export const getPageDetail = (params, id) => {
  return getRequest('/page/management/preview/' + id, params);
}

// 删除页面模块
export const deletePageBlock = (params) => {
  return postRequest('/page/management/deleteInstanceConfig', params);
}

// 获取页面模块详情
export const getPageBlockDetail = (params) => {
  return getRequest('/page/management/getConfig', params);
}

// 增加页面模块
export const insertPageBlock = (params) => {
  return postRequest('/page/management/insertInstanceConfig', params);
}

// 更新页面模块信息
export const updatePageBlock = (params) => {
  return postJson('/page/management/updateConfigs', params);
}

// 页面模块排序
export const sortPageBlock = (params) => {
  return postRequest('/page/management/sortInstanceConfigs', params);
}

// 更新页面信息
export const updatePage = (params) => {
  return postJson('/page/management/updateInstance', params);
}


/**
 * 页面内容编辑
 */
// 获取模块内容
export const getBlockContent = (params) => {
  return getRequest('/page/dataSource/getById', params);
}
