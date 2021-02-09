import React from 'react';
import { Button, Space, Slider, Switch } from 'antd';
import { observer } from 'mobx-react';
import timeLineState from '@pages/Home/TimeLine/index.state';

function Index() {

    // 调整历史轴的参数
    const handleChange = (value) => {
        // console.log("value:", value)
        timeLineState.setPxPerYear(value)
    }
    // 重置历史轴的参数
    const handleResetClick = () => {
        timeLineState.setPxPerYear(timeLineState.pxPerYearOrg);
    }

    // 切换横竖屏
    const onSwitchChange = () => {
        timeLineState.toggleMainContentModelFlag();
    }

    // 新增历史项目
    const handleNewClick = () => { }

    return (
        <Space>
            <Button type="primary" onClick={handleNewClick}>new project</Button>
            <div style={{ width: "40px" }} />
            <div>像素/年:</div>
            <div style={{ width: "100px" }}>
                <Slider value={timeLineState.pxPerYear} min={1} max={5 * timeLineState.pxPerYearOrg} onChange={handleChange} />
            </div>
            <Button type="primary" onClick={handleResetClick}>reset</Button>
            <div style={{ width: "40px" }} />
            <Switch defaultChecked={true} onChange={onSwitchChange} checkedChildren="横屏模式" unCheckedChildren="竖屏模式" />
            {/* <AddProjectForm 
                    visible={this.state.showAddProjectModal} 
                    onCancel={ this.onAddProjModalClose } 
                    submitMap={ this.onSubmit }
                /> */}
        </Space>
    )
}

export default observer(Index);
