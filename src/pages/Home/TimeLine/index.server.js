import request from '@/axios/axios';

const getAllProjectsUrl = '/appinterface/getAllProjects';
const getProjectItemsUrl = '/appinterface/getProjectItems';
const createProjectUrl = '/appinterface/createProject';
const deleteProjectUrl = '/appinterface/deleteProject';
const createProjectItemUrl = '/appinterface/createProjectItem';
const deleteProjectItemUrl = '/appinterface/deleteProjectItem';
const addTipUrl = '/appinterface/addTip';
const deleteTipUrl = '/appinterface/deleteTip';

class Services {

    // 获取项目列表
    getAllProjects = () => {
        return request({
            url: getAllProjectsUrl,
            method: 'post',
            data: {}
        })
    }

    // 获取某一项目的详细信息
    getProjectItems = projectId => {
        return request({
            url: getProjectItemsUrl,
            method: 'post',
            data: { 'projectId': projectId }
        })
    }

    // 创建新项目
    createProject = data => {
        return request({
            url: createProjectUrl,
            method: 'post',
            data
        })
    }

    // 删除项目
    deleteProject = projectId => {
        return request({
            url: deleteProjectUrl,
            method: 'post',
            data: { 'projectId': projectId }
        })
    }

    // 创建新项目的一个事件
    createProjectItem = data => {
        return request({
            url: createProjectItemUrl,
            method: 'post',
            data
        })
    }

    // 删除项目的一个事件
    deleteProjectItem = (projectId, itemId) => {
        return request({
            url: deleteProjectItemUrl,
            method: 'post',
            data: { 'projectId': projectId, 'itemId': itemId }
        })
    }

    // 新增Tip
    addTip = (projectId, itemId, tipContent) => {
        return request({
            url: addTipUrl,
            method: 'post',
            data: { 'projectId': projectId, 'itemId': itemId, 'tipContent': tipContent }
        })
    }

    // 删除Tip
    deleteTip = (projectId, itemId, tipId) => {
        return request({
            url: deleteTipUrl,
            method: 'post',
            data: { 'projectId': projectId, 'itemId': itemId, 'tipId': tipId }
        })
    }


}

export default new Services();