import React, { useState } from 'react';
import { Modal, Form, Radio, Input } from 'antd';
import { observer } from 'mobx-react';
import mapState from '@pages/Home/HisMap/index.state';

function Index() {

    const [radioValue, setRadioValue] = useState(-1);

    const onRadioChange = (value) => {
        setRadioValue(value);
    };
    const onFinish = () => { };

    const onModalCancel = () => {
        mapState.setShowAddSubLocationModalFlag(false);
    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    return (
        <Modal
            visible={mapState.showAddSubLocationModalFlag}
            title="Add Sub Location"
            onCancel={onModalCancel}
        >
            <Form
                name="add sub location"
                // initialValues={{
                //     remember: true,
                // }}
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item
                    name="locationType"
                    label="type"
                    rules={[{ required: true }]}
                >
                    <Radio.Group onChange={onRadioChange} value={radioValue}>
                        <Radio value={0}>地址</Radio>
                        <Radio value={1}>目录</Radio>
                    </Radio.Group>
                </Form.Item>
                {radioValue === 1 ?
                    <>
                        <Form.Item
                            name="dirName"
                            label="dir name:"
                            rules={[{ required: true, message: 'Please input dir name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </> :
                    <>
                        <Form.Item
                            name="locationName"
                            label="location name:"
                            rules={[{ required: true, message: 'Please input location name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="locationDes"
                            label="location des:"
                            rules={[{ required: false, message: 'Please input location des!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="locationLng"
                            label="location Lng:"
                            rules={[{ required: true, message: 'Please input location Lng!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="locationLat"
                            label="location Lat:"
                            rules={[{ required: true, message: 'Please input location Lat!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </>
                }
            </Form>

        </Modal>
    )
}

export default observer(Index);
