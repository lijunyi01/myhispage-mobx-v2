import { makeAutoObservable } from 'mobx';
import server from './index.server';

const {
    getAData,       // 接口一
    getLocationTree,  // 地图页面获取地点树形结构的数据
} = server;

class MapState {

    // mobx6.0开始state要加这个构造函数; 且属性前不用加@observable,方法前不用加@action
    constructor() {
        makeAutoObservable(this);
    }

    // 高德地图对象
    map = null;
    // 高德地图的MapType控件对象，用于切换地图模式
    mapTypeControl = null;
    // 高德地图的ControlBar控件对象，用于旋转地图
    controlBar = null;
    // 是否显示高德地图的MapType控件
    showMapTypeControl = false;
    // 是否显示高德地图的ControlBar控件
    showControlBar = false;
    // AMap资源是否加载完成
    aMapReadyFlag = false;
    // 地图默认中心点
    defaultCenter = [113, 33];
    // 默认缩放级别
    defaultZoom = 5;
    // 显示markers 的开关
    showMarkersFlag = false;
    // 显示location select 抽屉的开关
    showLocationSelectDwawerFlag = false;
    // markers 列表
    markerList = [{
        "markerId": 3,
        "markerLng": 112.23,
        "markerLat": 34.32,
        "infoWindowTitle": "江陵",
        "infoWindowContent": "千里江陵一日还"
    },
    {
        "markerId": 4,
        "markerLng": 119.45,
        "markerLat": 32.2,
        "infoWindowTitle": "京口",
        "infoWindowContent": "现镇江"
    }];

    // 地点树的数据
    locationTreeData = [];
    // locationTreeData = [
    //     {
    //         title: '中国地名',
    //         key: '1',
    //         children: [
    //             {
    //                 title: '城市',
    //                 key: '2',
    //                 children: [
    //                     {
    //                         title: '江陵',
    //                         key: '3',
    //                         children: null
    //                     },
    //                     {
    //                         title: '江夏',
    //                         key: '5',
    //                         children: null
    //                     },
    //                     {
    //                         title: '京口',
    //                         key: '4',
    //                     },
    //                     {
    //                         title: '京口2',
    //                         key: '41',
    //                     },
    //                     {
    //                         title: '京口3',
    //                         key: '42',
    //                     },
    //                     {
    //                         title: '京口4',
    //                         key: '43',
    //                     },
    //                     {
    //                         title: '京口5',
    //                         key: '44',
    //                     },
    //                     {
    //                         title: '京口6',
    //                         key: '45',
    //                     },
    //                     {
    //                         title: '京口7',
    //                         key: '46',
    //                     },
    //                     {
    //                         title: '京口8',
    //                         key: '48',
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: '地点',
    //                 key: '6',
    //                 children: [
    //                     {
    //                         title: '桂陵',
    //                         key: '8',
    //                     },
    //                     {
    //                         title: '马陵',
    //                         key: '9',
    //                     },
    //                     {
    //                         title: '长平',
    //                         key: '10',
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: '关隘',
    //                 key: '7',
    //             },
    //         ],
    //     },
    //     {
    //         title: '外国地名',
    //         key: '11',
    //         children: [
    //             {
    //                 title: '0-1-0-0',
    //                 key: '13',
    //             },
    //             {
    //                 title: '0-1-0-1',
    //                 key: '14',
    //             },
    //             {
    //                 title: '0-1-0-2',
    //                 key: '15',
    //             },
    //         ],
    //     },
    //     {
    //         title: '海洋地名',
    //         key: '12',
    //     },
    // ];

    setMap = (newValue) => {
        this.map = newValue;
    }
    setMapTypeControl = (newValue) => {
        this.mapTypeControl = newValue;
    }
    setControlBar = (newValue) => {
        this.controlBar = newValue;
    }
    toggleShowMapTypeControl = () => {
        this.showMapTypeControl = !this.showMapTypeControl;
    }
    toggleShowControlBar = () => {
        this.showControlBar = !this.showControlBar;
    }
    setAMapReadyFlag = (newValue) => {
        this.aMapReadyFlag = newValue;
    }
    toggleShowMarkersFlag = () => {
        this.showMarkersFlag = !this.showMarkersFlag;
    }
    toggleShowLocationSelectDwawerFlag = () => {
        this.showLocationSelectDwawerFlag = !this.showLocationSelectDwawerFlag;
    }

    // generateMarkerList = async (checkedKeys) => {
    //     // 发请求通过selectedKeys 获得markerList并覆盖当前的markerList
    //     console.log("param:",checkedKeys)
    //     if(checkedKeys.length === 0 ){
    //         this.markerList = [];
    //         // this.isShowFlag = false;
    //     }else{
    //         try{
    //             const data = {
    //                 locationIdArray: checkedKeys,
    //             }
    //             let res = await getMarkerList(data);
    //             // console.log("res:",res)
    //             this.markerList = res.markerList;
    //             // this.isShowFlag = true;
    //         }catch (err) {
    //             console.log(err);
    //         }           
    //     }
    // }

    getDataAMethod = (userName, userId) => {
        Promise.all([
            getAData(userName, userId),
        ]).then(r => {
            //处理接口拿到的结果
        })
    }


    // Promise.all的写法，多个接口调用，且需要等各接口都返回才处理结果的场景才需要用到
    // getLocationTreeMethod = () => {
    //     Promise.all([
    //         getLocationTree(),
    //     ]).then(res => {
    //         //处理接口拿到的结果
    //         // console.log("res:", res);
    //         this.locationTreeData = res[0].locationBeanList;
    //     })
    // }

    getLocationTreeMethod = () => {
        getLocationTree().then(res => {
            //处理接口拿到的结果
            // console.log("res:", res);
            this.locationTreeData = res.locationBeanList;
        })
    }
}

export default new MapState();