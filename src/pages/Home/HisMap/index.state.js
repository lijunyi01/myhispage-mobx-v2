import { makeAutoObservable } from 'mobx';

class mapState {

    // mobx6.0开始state要加这个构造函数; 且属性前不用加@observable,方法前不用加@action
    constructor() {
        makeAutoObservable(this);
    }

    // map = null;
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

    // setMap = (newValue) => {
    //     this.map = newValue;
    // }
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
    setAMapReadyFlag = () => {
        this.aMapReadyFlag = true;
    }
}

export default new mapState();