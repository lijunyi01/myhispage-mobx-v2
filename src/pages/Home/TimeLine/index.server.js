import request from '@/axios/axios';

const getAllProjectsUrl = '/appinterface/getAllProjects';
const getProjectItemsUrl = '/appinterface/getProjectItems';


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
    getProjectItems = (projectId) => {
        return request({
            url: getProjectItemsUrl,
            method: 'post',
            data: { 'projectId': projectId }
        })
    }


}

export default new Services();