import React from 'react';
import { toJS } from 'mobx';
import timeLineState from '@pages/Home/TimeLine/index.state';
import { Table, Button, Form, Input, Divider } from 'antd';

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

    const itemTips = getItemTips();
    console.log("tips:", itemTips);

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
                <Button type="primary" onClick={() => { console.log("record:", record); }}>Delete</Button>
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

    const onFinish = values => { }

    return (
        <div>
            <Table dataSource={itemTips} rowKey="id" columns={columns} bordered scroll={{ y: 150 }} pagination={false} />
            <Divider />
            <Form
                name="new project"
                initialValues={{}}
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
                {/* <Form.Item
                    name="projectDes"
                    label="project des:"
                    rules={[{ required: true, message: 'Please input project des!' }]}
                >
                    <Input />
                </Form.Item> */}
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
