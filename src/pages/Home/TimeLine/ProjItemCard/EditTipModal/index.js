import React from 'react';
import { Modal } from 'antd';
// import { observer } from 'mobx-react';
// import mapState from '@pages/Home/HisMap/index.state';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditTip from './EditTip';

function Index(props) {

    return (
        <Modal
            visible={props.showFlag}
            title={"Modify Tip:" + props.projectId + "-" + props.itemId}
            onCancel={props.onClose}
            footer={null}
        >
            <EditTip projectId={props.projectId} itemId={props.itemId} />

        </Modal>
    )
}

export default Index;
