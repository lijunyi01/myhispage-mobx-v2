import React, { useState } from 'react';
import { Modal, Form, Input, Button, Radio, Select, Switch, Row, Col } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

function Index(props) {

    // 点时间或段时间
    const [timeType, setTimeType] = useState(1);
    // 公元纪年或年号纪年
    const [yearType, setYearType] = useState(1);

    const onFinish = values => {
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

    const selectBefore = (
        <Select defaultValue="ad" className="select-before">
            <Option value="ad">公元后</Option>
            <Option value="bc">公元前</Option>
        </Select>
    );
    const selectBeforeNianhao = (
        <Select defaultValue="1" className="select-before" showSearch
            optionFilterProp="children"
            style={{ width: 84 }}
        >
            {props.nianhaoList.map(item => {
                return <Option key={item.key} value={item.key}>{item.value}</Option>
            })}
        </Select>
    );

    return (
        <Modal
            visible={props.showFlag}
            title={"Add Project Item"}
            onCancel={props.onClose}
            footer={null}
        >
            <Form
                name="Add Project Item"
                initialValues={{
                    timeType: 1,
                    yearType: 1,
                }}
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item
                    name="itemName"
                    label="事件名称:"
                    rules={[{ required: true, message: '请填入事件名称!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="itemDes"
                    label="事件描述:"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="timeType"
                    label="时间类型选择:"
                >
                    <Radio.Group onChange={e => { setTimeType(e.target.value) }}>
                        <Radio value={1}>时间点事件</Radio>
                        <Radio value={2}>时间段事件</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="yearType"
                    label="纪年方式选择:"
                >
                    <Radio.Group onChange={e => { setYearType(e.target.value) }}>
                        <Radio value={1}>公元纪年</Radio>
                        <Radio value={2}>年号纪年</Radio>
                    </Radio.Group>
                </Form.Item>
                {timeType === 1 ?  // 点时间
                    <>
                        {yearType === 1 ?   // 公元纪年

                            <Form.Item
                                label="事件时间:"
                                extra="年份处请填阿拉伯数字。 如时间精确到年,则年份后的时间可不填; 否则填入月日及时间,此处可只填写月份(如:02),也可只填写月日(如:02-01),还可填入月日及时间(如:02-01 12:53:36)"
                            >
                                <Row gutter={8}>
                                    <Col span={18}>
                                        <Form.Item
                                            name="startTime_dian_gongyuan"
                                            // label="事件时间:"
                                            rules={[{ required: true, message: '请填入事件时间!' }]}
                                        >
                                            <Input addonBefore={selectBefore} addonAfter="年" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name="exactFlag_dian_gongyuan"
                                        >
                                            <Switch defaultChecked={true} onChange={() => { }} checkedChildren="确切" unCheckedChildren="粗略" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form.Item>

                            :

                            <Form.Item     // 点时间 - 年号纪年
                                label="事件时间:"
                                extra="年份处请填阿拉伯数字。 如时间精确到年,则年份后的时间可不填; 否则填入月日及时间,此处可只填写月份(如:02),也可只填写月日(如:02-01),还可填入月日及时间(如:02-01 12:53:36)"
                            >
                                <Row gutter={8}>
                                    <Col span={18}>
                                        <Form.Item
                                            name="startTime_dian_nianhao"
                                            // label="事件时间:"
                                            rules={[{ required: true, message: '请填入事件时间!' }]}
                                        >
                                            <Input addonBefore={selectBeforeNianhao} addonAfter="年" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name="exactFlag_dian_nianhao"
                                        >
                                            <Switch defaultChecked={true} onChange={() => { }} checkedChildren="确切" unCheckedChildren="粗略" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form.Item>

                        }
                    </>
                    :
                    <>
                        {yearType === 1 ?    //段时间 - 公元纪年
                            <>
                                <Form.Item
                                    label="事件起始时间:"
                                >
                                    <Row gutter={8}>
                                        <Col span={18}>
                                            <Form.Item
                                                name="startTime_duan_gongyuan"
                                                // label="事件时间:"
                                                rules={[{ required: true, message: '请填入事件时间!' }]}
                                            >
                                                <Input addonBefore={selectBefore} addonAfter="年" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name="start_exactFlag_duan_gongyuan"
                                            >
                                                <Switch defaultChecked={true} onChange={() => { }} checkedChildren="确切" unCheckedChildren="粗略" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item
                                    label="事件结束时间:"
                                    extra="年份处请填阿拉伯数字。 如时间精确到年,则年份后的时间可不填; 否则填入月日及时间,此处可只填写月份(如:02),也可只填写月日(如:02-01),还可填入月日及时间(如:02-01 12:53:36)"
                                >
                                    <Row gutter={8}>
                                        <Col span={18}>
                                            <Form.Item
                                                name="endTime_duan_gongyuan"
                                                // label="事件时间:"
                                                rules={[{ required: true, message: '请填入事件时间!' }]}
                                            >
                                                <Input addonBefore={selectBefore} addonAfter="年" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name="end_exactFlag_duan_gongyuan"
                                            >
                                                <Switch defaultChecked={true} onChange={() => { }} checkedChildren="确切" unCheckedChildren="粗略" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </>
                            :
                            <>
                                <Form.Item          // 段时间 - 年号纪年
                                    label="事件起始时间:"
                                >
                                    <Row gutter={8}>
                                        <Col span={18}>
                                            <Form.Item
                                                name="startTime_duan_nianhao"
                                                // label="事件时间:"
                                                rules={[{ required: true, message: '请填入事件时间!' }]}
                                            >
                                                <Input addonBefore={selectBeforeNianhao} addonAfter="年" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name="start_exactFlag_duan_nianhao"
                                            >
                                                <Switch defaultChecked={true} onChange={() => { }} checkedChildren="确切" unCheckedChildren="粗略" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item
                                    label="事件结束时间:"
                                    extra="年份处请填阿拉伯数字。 如时间精确到年,则年份后的时间可不填; 否则填入月日及时间,此处可只填写月份(如:02),也可只填写月日(如:02-01),还可填入月日及时间(如:02-01 12:53:36)"
                                >
                                    <Row gutter={8}>
                                        <Col span={18}>
                                            <Form.Item
                                                name="endTime_duan_nianhao"
                                                // label="事件时间:"
                                                rules={[{ required: true, message: '请填入事件时间!' }]}
                                            >
                                                <Input addonBefore={selectBeforeNianhao} addonAfter="年" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                name="end_exactFlag_duan_nianhao"
                                            >
                                                <Switch defaultChecked={true} onChange={() => { }} checkedChildren="确切" unCheckedChildren="粗略" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </>
                        }
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
