import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
// import { createProject } from '@axios/api';
// import appState from '@/index.state';

const AddSubLocation = ({ visible, submitMap, onCancel, currentDetailData }) => {

    const [radioValue, setRadioValue] = useState(-1);

    const [form] = Form.useForm();
    let initValues = currentDetailData === undefined || currentDetailData.length === 0 ? { locationType: 0 } :
        {
            locationType: 0
        }

    // 改变状态的方法必须放入某函数内，不能直接调用；否则就可能导致循环渲染（函数类组件渲染==组件函数被调用）        
    // form.setFieldsValue(initValues)
    useEffect(() => {
        if (radioValue === -1) {
            form.setFieldsValue(initValues);
        }
        if (visible === false) {
            setRadioValue(-1)
        }
    });

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

    const onRadioChange = e => {
        console.log("target value:", e.target.value);
        setRadioValue(e.target.value);
    };

    // console.log("radio value:",radioValue);
    // console.log("init values:",initValues);
    return (
        <Modal
            getContainer={false}
            visible={visible}
            title="Add Sub Location"
            onCancel={onCancel}
            width={800}
            destroyOnClose={false}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        form.setFieldsValue(values)
                        submitMap(values);
                        form.resetFields();
                    })
                    .catch(info => {
                        console.log('校验失败:', info);
                    });
            }}
        >
            <Form form={form} {...formItemLayout} initvalues={initValues}>

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

export default AddSubLocation;
