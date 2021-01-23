import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import AMapLoader from '@amap/amap-jsapi-loader';
import mapState from './index.state';
import { Button } from 'antd';
import './index.less';

function Index() {

    let map = null;

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
            map = new AMap.Map('mapContainer', {
                pitch: 0, // 地图俯仰角度，有效范围 0 度- 83 度
                viewMode: '3D' // 地图模式
            });
            map.addControl(new AMap.Scale());   // 比例尺
            // map.addControl(new AMap.ToolBar());  // 缩放控件
            map.addControl(new AMap.MapType({ defaultType: 1 }));
            map.addControl(new AMap.ControlBar());
            //map.addControl(new AMap.HawkEye()); // 缩略图
            // map.add(new AMap.Marker({
            //     position: map.getCenter()
            // }));
            let position = [113, 35];
            map.setCenter(position);
            map.setZoom(5);
            console.log('地图加载完成');
            // mapState.setMap(map);

            // setInterval(() => {
            //     map.setZoom(i++);
            // }, 25000);

        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        aMapLoad();
        console.log("useEffect");
    }, []);

    const handleClick = () => {
        // mapState.map.setCenter([111, 35]);
        map.setCenter([111, 35]);
    }

    return (
        <div id='mapContainer' style={{ height: "100%" }}>
            <Button id='mapbutton' type='primary' onClick={handleClick}>test</Button>
        </div >
    )
}

export default observer(Index);
