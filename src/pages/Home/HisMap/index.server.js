import request from '@/axios/axios';
// import config from '@config/config';

// const { BASE_URL } = config;
const getMarkerListUrl = '/appinterface/map/getMarkerList';
const getLocationTreeUrl = '/appinterface/map/getTreeData';
const addLocationUrl = '/appinterface/map/addLocation';
const deleteLocationUrl = '/appinterface/map/deleteLocation';

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

    // 向地点树形结构中添加内容（目录或地址）
    addLocation = data => {
        return request({
            url: addLocationUrl,
            method: 'post',
            data
        })
    }

    // 在地点树形结构中删除内容（目录或地址）
    deleteLocation = data => {
        return request({
            url: deleteLocationUrl,
            method: 'post',
            data
        })
    }


}

export default new Services();