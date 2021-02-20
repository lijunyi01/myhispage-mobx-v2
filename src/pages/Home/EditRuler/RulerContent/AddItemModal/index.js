import React from 'react';
import { Modal, Form, Input, Button, InputNumber } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

function index(props) {
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
                props.onSubmit(values);
            }
            ,
            onCancel() {
                // console.log('Cancel');
            },
        });
    };

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
            title={"New Ruler Item"}
            onCancel={props.onClose}
            footer={null}
        >
            <Form
                name="new ruler item"
                initialValues={{
                    itemDes: "",
                }}
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item
                    name="itemName"
                    label="item name:"
                    rules={[{ required: true, message: 'Please input ruler name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="itemDes"
                    label="item des:"
                    rules={[{ required: false, message: 'Please input ruler des!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="startYear"
                    label="start year:"
                    rules={[{ required: true, message: 'Please input start year!' }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="endYear"
                    label="end year:"
                    rules={[{ required: true, message: 'Please input end year!' }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item {...formItemTailLayout}>
                    <Button type="primary" htmlType="submit" style={{ 'width': '50%', 'float': 'right' }}>
                        确定
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default index;
