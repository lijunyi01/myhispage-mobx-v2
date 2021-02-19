import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
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
            title={"New Ruler"}
            onCancel={props.onClose}
            footer={null}
        >
            <Form
                name="new ruler"
                initialValues={{
                    locationType: 0,
                }}
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item
                    name="rulerName"
                    label="ruler name:"
                    rules={[{ required: true, message: 'Please input ruler name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="rulerDes"
                    label="ruler des:"
                    rules={[{ required: true, message: 'Please input ruler des!' }]}
                >
                    <Input />
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
