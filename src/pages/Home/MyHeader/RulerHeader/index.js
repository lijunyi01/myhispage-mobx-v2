import React, { useState } from 'react';
import { Button, Space } from 'antd';
// import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import AddRulerModal from './AddRulerModal';
import timeLineState from '@pages/Home/TimeLine/index.state';

function Index(props) {

    // 控制AddRulerModal的数据
    const [showAddRulerModal, setShowAddRulerModal] = useState(false);

    return (
        <Space>
            <Button type="primary" onClick={() => { setShowAddRulerModal(true) }}>新建标尺</Button>
            <div style={{ width: '50px' }}></div>
            <Button type="primary" onClick={() => { props.history.push(props.location.state.from) }}>返回</Button>
            <AddRulerModal
                showFlag={showAddRulerModal}
                onClose={() => setShowAddRulerModal(false)}
                onSubmit={param => { timeLineState.createRulerMethod(param, () => { setShowAddRulerModal(false) }); }}
            />
        </Space >
    )
}

export default withRouter(Index);
