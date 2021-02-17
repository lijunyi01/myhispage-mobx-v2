import React from 'react';
import { Button, Space } from 'antd';
// import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

function Index(props) {

    // console.log(props.location.state);

    return (
        <Space>
            <Button type="primary" onClick={() => { props.history.push(props.location.state.from) }}>返回</Button>
        </Space >
    )
}

export default withRouter(Index);
