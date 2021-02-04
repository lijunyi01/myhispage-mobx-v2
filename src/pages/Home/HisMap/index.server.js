import request from '@/axios/axios';
// import config from '@config/config';

// const { BASE_URL } = config;
const getMarkerListUrl = '/appinterface/map/getMarkerList';
const getLocationTreeUrl = '/appinterface/map/getTreeData';

class Services {

    // 通过locationIds 查询markerList
    getMarkerList = (locationIds) => {
        return request({
            url: getMarkerListUrl,
            method: 'post',
            data: { "locationIdArray": locationIds }
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