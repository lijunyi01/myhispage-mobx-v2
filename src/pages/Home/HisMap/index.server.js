import request from '@/axios/axios';
// import config from '@config/config';

// const { BASE_URL } = config;
const jiekouUrl1 = '/pare_bi_data_process/manage/getAdata';
const getLocationTreeUrl = 'appinterface/map/getTreeData';

class Services {

    // 某接口示例
    getAData = (userName, userId) => {
        return request({
            url: jiekouUrl1,
            method: 'post',
            data: { userName, userId }
        })
    }

    // 地图页面获取地点树形结构的数据
    getLocationTree = () => {
        return request({
            url: getLocationTreeUrl,
            method: 'post',
            data: {}
        })
    }

}

export default new Services();