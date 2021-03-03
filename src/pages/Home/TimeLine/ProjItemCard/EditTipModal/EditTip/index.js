import React from 'react';
import { toJS } from 'mobx';
import timeLineState from '@pages/home/timeLine/index.state';
import { Table, Button, Form, Input, Divider, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';

function index(props) {


    const getItemTips = () => {
        const tmpItems = toJS(timeLineState.activedProjectItems).filter(item => {
            return item.itemId === props.itemId;
        });
        let currentItem = null;
        if (tmpItems.length === 1) {
            currentItem = tmpItems[0];
        }
        if (currentItem) {
            return currentItem.itemTipList;
        } else {
            return [];
        }

    }

    const handleDeleteTip = tipId => {
        Modal.confirm({
            title: '确认删除吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                timeLineState.deleteTipMethod(props.projectId, props.itemId, tipId);
            }
            ,
            onCancel() {
                // console.log('Cancel');
            },
        });
    };

    const itemTips = getItemTips();
    // console.log("tips:", itemTips);

    const columns = [
        {
            title: 'Tip',
            dataIndex: 'tipcontent',
            key: 'tipcontent',
            width: 370,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" onClick={() => { handleDeleteTip(record.id); }}>Delete</Button>
            ),
        },
    ];

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

    const onFinish = values => {
        if (_.trim(values.tipContent) !== "") {
            Modal.confirm({
                title: '确认新增吗?',
                icon: <ExclamationCircleOutlined />,
                content: '',
                okText: '是',
                okType: 'danger',
                cancelText: '否',
                onOk: () => {
                    timeLineState.addTipMethod(props.projectId, props.itemId, values.tipContent);
                }
                ,
                onCancel() {
                    // console.log('Cancel');
                },
            });
        } else {
            message.warn("content 不能为空字符串！");
        }

    }

    return (
        <div>
            <Table dataSource={itemTips} rowKey="id" columns={columns} bordered scroll={{ y: 150 }} pagination={false} />
            <Divider />
            <Form
                name="new project"
                initialValues={{ "tipContent": "" }}
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item
                    name="tipContent"
                    label="tip content:"
                    rules={[{ required: true, message: 'Please input tip content!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...formItemTailLayout}>
                    <Button type="primary" htmlType="submit" style={{ 'width': '50%', 'float': 'right' }}>
                        新增Tip
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default index
