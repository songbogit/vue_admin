import { getRequest, postRequest, postJson } from '@/libs/axios';

/**
 *  单视频
 */
// 添加视频
export const addVideo = (params) => {
  return postJson('/material/manager/addVideo', params);
}

// 获取单视频详情
export const getVideoById = (params) => {
  return getRequest('/material/manager/getVideoById', params);
}

// 获取单视频列表
export const getVideoList = (params) => {
  return getRequest('/material/manager/listVideo', params);
}

// 更新单视频
export const updateVideo = (params) => {
  return postJson('/material/manager/updateVideo', params);
}

/**
 *  视频集
 */
// 添加视频集
export const addVideoSet = (params) => {
  return postJson('/material/manager/addVideoSet', params);
}

// 获取视频集详情
export const getVideoSetById = (params) => {
  return getRequest('/material/manager/getVideoSetById', params);
}

// 获取视频集列表
export const getVideoSetList = (params) => {
  return getRequest('/material/manager/listVideoSet', params);
}

// 更新视频集
export const updateVideoSet = (params) => {
  return postJson('/material/manager/updateVideoSet', params);
}




