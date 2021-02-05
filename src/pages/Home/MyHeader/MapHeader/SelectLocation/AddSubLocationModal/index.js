import React, { useState } from 'react';
import { Modal, Form, Radio, Input, Button } from 'antd';
// import { observer } from 'mobx-react';
// import mapState from '@pages/Home/HisMap/index.state';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// import ApiLoading from '@com/ApiLoading';

function Index(props) {

    const [radioValue, setRadioValue] = useState(0);

    const onRadioChange = e => {
        setRadioValue(e.target.value);
    };
    const onFinish = values => {
        // console.log("onFinish:", { ...values, selectedKey: props.locationId });
        Modal.confirm({
            title: '确认提交吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                // console.log('Ok');
                props.onSubmit({ ...values, selectedKey: props.locationId });
            }
            ,
            onCancel() {
                // console.log('Cancel');
            },
        });
    };

    // const onModalCancel = () => {
    //     mapState.setShowAddSubLocationModalFlag(false);
    // };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 18,
            },
            sm: {
                span: 6,
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
    const formItemTailLayout = {
        wrapperCol: { offset: 6, span: 16 },
    };

    return (
        <Modal
            visible={props.showFlag}
            title={"Add Sub Location: " + props.locationId}
            onCancel={props.onClose}
            footer={null}
        >
            <Form
                name="add sub location"
                initialValues={{
                    locationType: 0,
                }}
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item
                    name="locationType"
                    label="type"
                    rules={[{ required: true }]}
                >
                    <Radio.Group onChange={onRadioChange}>
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
                <Form.Item {...formItemTailLayout}>
                    <Button type="primary" htmlType="submit" style={{ 'width': '50%', 'float': 'right' }}>
                        确定
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default Index;
