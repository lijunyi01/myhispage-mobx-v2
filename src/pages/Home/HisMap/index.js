import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import AMapLoader from '@amap/amap-jsapi-loader';
import mapState from './index.state';
import { toJS } from 'mobx';
// import { Button } from 'antd';
import './index.less';

function Index() {

    const [aMap, setAMap] = useState(null);

    const aMapLoad = () => {
        AMapLoader.load({
            "key": "474ce305c29d936f8bcd352dad4679a3",              // 申请好的Web端开发者Key，首次调用 load 时必填
            "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            "plugins": ['AMap.Scale', 'AMap.ToolBar', 'AMap.MapType', 'AMap.ControlBar', 'AMap.HawkEye'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            "AMapUI": {             // 是否加载 AMapUI，缺省不加载
                "version": '1.1',   // AMapUI 缺省 1.1
                "plugins": [],       // 需要加载的 AMapUI ui插件
            },
            // "Loca": {                // 是否加载 Loca， 缺省不加载
            //     "version": '1.3.2'  // Loca 版本，缺省 1.3.2
            // },
        }).then((AMap) => {
            setAMap(AMap);
            // console.log('setAMap异步执行');
            // console.log(aMap);
            let map = new AMap.Map('mapContainer', {
                pitch: 0, // 地图俯仰角度，有效范围 0 度- 83 度
                viewMode: '3D', // 地图模式
                center: toJS(mapState.defaultCenter),   // 中心点
                zoom: mapState.defaultZoom,  // 缩放级别
                // layers: [  //使用多个图层。 通过MapType控件设置显示的卫星图能显示底图的文字信息
                //     new AMap.TileLayer.Satellite({ opacity: 0.5 }),
                //     // new AMap.TileLayer.RoadNet()
                // ],
            });
            map.addControl(new AMap.Scale());   // 比例尺
            map.addControl(new AMap.ToolBar());  // 缩放控件
            const typeControl = new AMap.MapType({ defaultType: 1 })  // 地图类型选择控件
            typeControl.hide();
            map.addControl(typeControl);
            const controlBar = new AMap.ControlBar();  // 地图倾角、旋转等操作控件
            controlBar.hide();
            map.addControl(controlBar);
            // console.log('地图加载完成');
            mapState.setMap(map);
            mapState.setMapTypeControl(typeControl);
            mapState.setControlBar(controlBar);
            mapState.setAMapReadyFlag();   // 设置为true

        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        aMapLoad();
        // console.log('aMapLoad异步执行');
        // console.log(aMap);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     if (aMap !== null) {
    //         console.log('完成aMap赋值');
    //     }
    // }, [aMap]);

    useEffect(() => {
        if (mapState.mapTypeControl) {
            if (mapState.showMapTypeControl) {
                mapState.mapTypeControl.show();
            } else {
                mapState.mapTypeControl.hide();
            }
        }
    }, [mapState.showMapTypeControl]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (mapState.controlBar) {
            if (mapState.showControlBar) {
                mapState.controlBar.show();
            } else {
                mapState.controlBar.hide();
            }
        }
    }, [mapState.showControlBar]);  // eslint-disable-line react-hooks/exhaustive-deps

    const showMarkers = () => {
        // 构造标记点
        const marker = new aMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: toJS(mapState.defaultCenter),
            anchor: 'bottom-center'
        });
        // mapState.map.add([marker]);
        // 构造矢量圆形
        const circle = new aMap.Circle({
            center: new aMap.LngLat("113", "33"), // 圆心位置
            // center: mapState.defaultCenter,
            radius: 100000,  //半径
            strokeColor: "#F33",  //线颜色
            strokeOpacity: 0.3,  //线透明度
            strokeWeight: 3,  //线粗细度
            fillColor: "#ee2200",  //填充颜色
            fillOpacity: 0.35 //填充透明度
        });
        mapState.map.add([circle, marker]);
    };
    const clearMarkers = () => {
        if (mapState.map && mapState.map.getAllOverlays('marker') !== null) {
            mapState.map.clearMap();
        }
    };
    useEffect(() => {
        // console.log(aMap);
        if (mapState.showMarkersFlag) {
            clearMarkers();
            showMarkers();
        } else {
            clearMarkers();
        }
    }, [mapState.showMarkersFlag]);  // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     console.log("didupdate and didmount");
    //     if (mapState.mapTypeControl) {
    //         if (mapState.showMapTypeControl) {
    //             mapState.mapTypeControl.show();
    //         } else {
    //             mapState.mapTypeControl.hide();
    //         }
    //     }

    //     if (mapState.controlBar) {
    //         if (mapState.showControlBar) {
    //             mapState.controlBar.show();
    //         } else {
    //             mapState.controlBar.hide();
    //         }
    //     }

    //     // }, [mapState.showControlBar, mapState.showMapTypeControl]);
    // });

    return (
        <div id='mapContainer' style={{ height: "100%" }}>
            {/* {mapState.showControlBar}
            {mapState.showMapTypeControl} */}
        </div >
    )
}

export default observer(Index);
