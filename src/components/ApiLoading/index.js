import React from 'react';
import { Spin } from 'antd';
import loadingState from './index.state';
import { observer } from 'mobx-react';
import './index.less';

function Index(props) {
    return (
        <Spin wrapperClassName="api-loading" spinning={loadingState.apiLoading}>{props.children}</Spin>
    )
}

export default observer(Index);
