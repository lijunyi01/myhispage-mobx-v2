import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import AMapLoader from '@amap/amap-jsapi-loader';
import mapState from './index.state';
import { toJS } from 'mobx';
// import { Button } from 'antd';
import './index.less';
import locationMarkerIcon from '@assets/icon/mark_b.png';
import sharpIcon from '@assets/icon/sharp.png';
import PageLoading from '@com/PageLoading';

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
            console.log('地图加载完成');
            mapState.setMap(map);
            mapState.setMapTypeControl(typeControl);
            mapState.setControlBar(controlBar);
            mapState.setAMapReadyFlag(true);   // 设置为true

        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        aMapLoad();
        mapState.getLocationTreeMethod();
        return function cleanup() {
            // console.log('clean up map');
            mapState.setAMapReadyFlag(false);
            if (mapState.showMarkersFlag) {
                mapState.toggleShowMarkersFlag();
            }
            if (mapState.showMapTypeControl) {
                mapState.toggleShowMapTypeControl();
            }
            if (mapState.showControlBar) {
                mapState.toggleShowControlBar();
            }
            mapState.setMap(null);
            mapState.setControlBar(null);
            mapState.setMapTypeControl(null);
            mapState.setMarkerList([]);
            mapState.setLocationTreeData([]);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     if (aMap !== null) {
    //         console.log('完成aMap赋值');
    //     }
    // }, [aMap]);

    useEffect(() => {
        // 地图加载完成才操作地图
        if (mapState.aMapReadyFlag && mapState.mapTypeControl) {
            if (mapState.showMapTypeControl) {
                mapState.mapTypeControl.show();
            } else {
                mapState.mapTypeControl.hide();
            }
        }
    }, [mapState.showMapTypeControl]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // 地图加载完成才操作地图
        if (mapState.aMapReadyFlag && mapState.controlBar) {
            console.log('22');
            if (mapState.showControlBar) {
                mapState.controlBar.show();
            } else {
                mapState.controlBar.hide();
            }
        }

    }, [mapState.showControlBar]);  // eslint-disable-line react-hooks/exhaustive-deps

    const showMarkers = () => {

        //构建自定义信息窗体
        const createInfoWindow = (title, content) => {
            var info = document.createElement("div");
            info.className = "custom-info input-card content-window-card";

            //可以通过下面的方式修改自定义窗体的宽高
            info.style.width = "200px";
            // 定义顶部标题
            var top = document.createElement("div");
            var titleD = document.createElement("div");
            // var closeX = document.createElement("img");
            top.className = "info-top";
            titleD.innerHTML = title;
            // closeX.src = "https://webapi.amap.com/images/close2.gif";
            // closeX.onclick = closeInfoWindow;

            top.appendChild(titleD);
            // top.appendChild(closeX);
            info.appendChild(top);

            // 定义中部内容
            var middle = document.createElement("div");
            middle.className = "info-middle";
            middle.innerHTML = content;
            info.appendChild(middle);

            // 定义底部内容
            var bottom = document.createElement("div");
            bottom.className = "info-bottom";
            var sharp = document.createElement("img");
            // sharp.src = "https://webapi.amap.com/images/sharp.png";
            sharp.src = sharpIcon;
            bottom.appendChild(sharp);
            info.appendChild(bottom);
            return info;
        }

        toJS(mapState.markerList).forEach(item => {
            // 构造标记点
            const marker = new aMap.Marker({
                icon: locationMarkerIcon,
                position: [item.markerLng, item.markerLat],
                anchor: 'bottom-center',
            });
            // 构造矢量圆形
            const circle = new aMap.Circle({
                center: new aMap.LngLat(item.markerLng, item.markerLat), // 圆心位置
                radius: 20000,  //半径
                strokeColor: "#F33",  //线颜色
                strokeOpacity: 0.3,  //线透明度
                strokeWeight: 3,  //线粗细度
                fillColor: "#ee2200",  //填充颜色
                fillOpacity: 0.35 //填充透明度
            });
            // 信息窗体
            let content = [];
            content.push(item.infoWindowContent);
            const infoWindow = new aMap.InfoWindow({
                isCustom: true,
                content: createInfoWindow(item.infoWindowTitle, content.join("<br/>")),
                offset: new aMap.Pixel(10, -50)
            });
            marker.on('mouseover', e => { infoWindow.open(mapState.map, e.target.getPosition()); });
            marker.on('mouseout', () => { infoWindow.close(); });

            mapState.map.add([circle, marker]);
        });
    };
    const clearMarkers = () => {
        if (mapState.map && mapState.map.getAllOverlays('marker') !== null) {
            mapState.map.clearMap();
        }
    };
    useEffect(() => {
        console.log("mapState.markerList:", toJS(mapState.markerList));
        // 地图加载完成才操作地图
        if (mapState.aMapReadyFlag) {
            if (mapState.showMarkersFlag) {
                clearMarkers();
                showMarkers();
            } else {
                clearMarkers();
            }
        }

    }, [mapState.showMarkersFlag, mapState.markerList]);  // eslint-disable-line react-hooks/exhaustive-deps

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
            {mapState.aMapReadyFlag ? <></> : <PageLoading show={true} />}
        </div >
    )
}

export default observer(Index);
