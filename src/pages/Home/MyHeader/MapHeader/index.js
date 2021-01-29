import React from 'react';
import { Button, Space, Switch } from 'antd';
import { observer } from 'mobx-react';
import mapState from '@pages/Home/HisMap/index.state';

function Index() {

    const handleLocationClick = () => { };
    const toggleShowMarkersFlag = () => {
        mapState.toggleShowMarkersFlag();
    };
    const resetMap = () => {
        // console.log(mapState.map);
        // console.log(mapState.defaultCenter);
        mapState.map.setCenter(mapState.defaultCenter);
        mapState.map.setZoom(mapState.defaultZoom);
    };
    // const onMapTypeChange = (e) => {
    //     console.log(e.target.value);
    //     mapState.setMapType(e.target.value);
    // };

    // MapType切换控件 显示与否
    const onSwitchChange = (checked) => {
        mapState.toggleShowMapTypeControl();
        // console.log(`switch to ${checked}`);
    }

    // ControlBar控件 显示与否
    const onSwitchChange2 = (checked) => {
        mapState.toggleShowControlBar();
        // console.log(`switch to ${checked}`);
    }

    return (

        mapState.aMapReadyFlag ?
            <Space>
                <Button type="primary" onClick={handleLocationClick}>Locations</Button>
                <Button type="primary" onClick={toggleShowMarkersFlag}>ToggleShowMarkers</Button>
                <Button type="primary" onClick={resetMap}>ResetMap</Button>
                {/* <span>zoomLevel:</span>
                <span>{zoomLevel}</span> */}
                <div style={{ width: "80px" }} />
                {/* <Radio.Group onChange={onMapTypeChange} defaultValue={2}>
                <Radio value={1}>普通模式</Radio>
                <Radio value={2}>地球模式</Radio>
                </Radio.Group> */}
                <Switch defaultChecked={false} onChange={onSwitchChange} checkedChildren="地图模式控件开" unCheckedChildren="地图模式控件关" />
                <Switch defaultChecked={false} onChange={onSwitchChange2} checkedChildren="地图旋转控件开" unCheckedChildren="地图旋转控件关" />
                {/* <SelectLocationDrawer showFlag={this.state.showLocationSelector} onClose={this.onLocationSelectorClose}/> */}
            </Space >
            :
            <></>
    )
}

export default observer(Index);
