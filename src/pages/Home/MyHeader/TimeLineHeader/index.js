import React, { useState } from 'react';
import { Button, Space, Slider, Switch, Select, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import timeLineState from '@pages/home/timeLine/index.state';
import AddProjectModal from './addProjectModal';
import { toJS } from 'mobx';
import { EditOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
// import _ from 'lodash';

const { Option } = Select;

function Index(props) {

    // 控制AddProjectModal的数据
    const [showAddProjModal, setShowAddProjModal] = useState(false);

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

    // 历史标尺多选框改变内容
    const handleSelectChange = values => {
        // console.log("selected:", values);
        timeLineState.generateSelectedRulers(values);

    };
    // 历史标尺多选框可选项
    const children = [];
    toJS(timeLineState.rulers).forEach(element => {
        children.push(<Option key={element.id}>{element.rulerName}</Option>);
    });

    return (
        <Space>
            <Button type="primary" onClick={() => setShowAddProjModal(true)}>new project</Button>
            <div style={{ width: "40px" }} />
            <Select
                mode="multiple"
                allowClear
                showArrow
                style={{ width: '200px' }}
                placeholder="请选择历史标尺"
                defaultValue={[]}
                onChange={handleSelectChange}
                maxTagCount="responsive"
            >
                {children}
            </Select>
            <Tooltip placement="bottom" title="编辑标尺">
                <Button type="primary" shape="round" icon={<EditOutlined />} size="small" onClick={() => { props.history.push({ pathname: '/myhis/refruler', state: { from: '/myhis/timeline' } }); }} />
            </Tooltip>
            <div style={{ width: "40px" }} />
            <div>像素/年:</div>
            <div style={{ width: "100px" }}>
                {/* 一般用defaultValue,但为了实现数据决定滑块位置，只能用value，使之
                成为受控的控件；注意value 和 onAfterChange冲突，不能同时使用；另外，
                使用了value，Slider控件操作起来就没那么顺滑了，毕竟数据变了会反过来导致控件渲染
                 */}
                <Slider value={timeLineState.pxPerYear} min={1} max={5 * timeLineState.pxPerYearOrg} onChange={handleChange} />
            </div>
            <Button type="primary" onClick={handleResetClick}>reset</Button>
            <div style={{ width: "40px" }} />
            <Switch defaultChecked={true} onChange={onSwitchChange} checkedChildren="横屏模式" unCheckedChildren="竖屏模式" />
            <AddProjectModal
                showFlag={showAddProjModal}
                onClose={() => setShowAddProjModal(false)}
                onSubmit={param => { timeLineState.createProjectMethod(param, () => { setShowAddProjModal(false) }); }}
            />
        </Space>
    )
}

export default withRouter(observer(Index));
