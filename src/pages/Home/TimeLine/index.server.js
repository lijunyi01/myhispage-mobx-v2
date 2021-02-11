import request from '@/axios/axios';

const getAllProjectsUrl = '/appinterface/getAllProjects';
const getProjectItemsUrl = '/appinterface/getProjectItems';
const createProjectUrl = '/appinterface/createProject';
const deleteProjectUrl = '/appinterface/deleteProject';


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


}

export default new Services();