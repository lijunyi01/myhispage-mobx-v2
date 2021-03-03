import React from 'react';
import { Modal } from 'antd';
import EditTip from './editTip';

function Index(props) {

    return (
        <Modal
            visible={props.showFlag}
            title={"Modify Tip"}
            onCancel={props.onClose}
            footer={null}
        >
            <EditTip projectId={props.projectId} itemId={props.itemId} />

        </Modal>
    )
}

export default Index;
