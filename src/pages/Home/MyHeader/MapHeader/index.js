import React from 'react';
import { Button, Space, Radio, Switch } from 'antd';
import mapState from '@pages/Home/HisMap/index.state';

function index() {

    const handleLocationClick = () => { };
    const toggleShowFlag = () => { };
    const resetCenter = () => { };
    // const onMapTypeChange = (e) => {
    //     console.log(e.target.value);
    //     mapState.setMapType(e.target.value);
    // };
    const onSwitchChange = (checked) => {
        mapState.toggleShowMapTypeControl();
        // console.log(`switch to ${checked}`);
    }

    return (
        <Space>
            <Button type="primary" onClick={handleLocationClick}>Locations</Button>
            <Button type="primary" onClick={toggleShowFlag}>ToggleShowFlag</Button>
            <Button type="primary" onClick={resetCenter}>ResetCenter</Button>
            {/* <span>zoomLevel:</span>
                <span>{zoomLevel}</span> */}
            <div style={{ width: "80px" }} />
            {/* <Radio.Group onChange={onMapTypeChange} defaultValue={2}>
                <Radio value={1}>普通模式</Radio>
                <Radio value={2}>地球模式</Radio>
            </Radio.Group> */}
            <Switch defaultChecked={false} onChange={onSwitchChange} checkedChildren="地图模式控件开" unCheckedChildren="地图模式控件关" />
            {/* <SelectLocationDrawer showFlag={this.state.showLocationSelector} onClose={this.onLocationSelectorClose}/> */}
        </Space>
    )
}

export default index;
