import { makeAutoObservable } from 'mobx';

class mapState {

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
}

export default new mapState();