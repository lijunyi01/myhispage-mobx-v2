import React, { useState } from 'react';
import { Modal, Form, Input, Button, Radio, Select, Switch, Row, Col } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

function Index(props) {

    // 点时间或段时间
    const [itemType, setItemType] = useState(1);
    // 公元纪年或年号纪年
    const [yearType, setYearType] = useState(1);

    const onFinish = values => {
        // console.log('Ok', values);
        const submitParamOrg = {
            itemName: values.itemName,
            itemDes: values.itemDes,
            itemType: values.itemType,
            yearType: values.yearType,
        };
        let submitParam = null;
        if (itemType === 1) {   // 时间点事件
            if (yearType === 1) {   // 公元纪年
                submitParam = {
                    ...submitParamOrg,
                    startYear: values.time_dian_gongyuan,
                    startYearPrefix: values.gongyuan_dian,
                    startYearFlag: values.exactFlag_dian_gongyuan
                }
            } else {    // 年号纪年
                submitParam = {
                    ...submitParamOrg,
                    startYear: values.time_dian_nianhao,
                    startYearPrefix: values.nianhao_dian,
                    startYearFlag: values.exactFlag_dian_nianhao
                }
            }
        } else {    // 时间段事件
            if (yearType === 1) {   // 公元纪年
                submitParam = {
                    ...submitParamOrg,
                    startYear: values.startTime_duan_gongyuan,
                    startYearPrefix: values.gongyuan_duan_start,
                    startYearFlag: values.exactFlag_duan_gongyuan_start,
                    endYear: values.endTime_duan_gongyuan,
                    endYearPrefix: values.gongyuan_duan_end,
                    endYearFlag: values.exactFlag_duan_gongyuan_end
                }
            } else {    // 年号纪年
                submitParam = {
                    ...submitParamOrg,
                    startYear: values.startTime_duan_nianhao,
                    startYearPrefix: values.nianhao_duan_start,
                    startYearFlag: values.exactFlag_duan_nianhao_start,
                    endYear: values.endTime_duan_nianhao,
                    endYearPrefix: values.nianhao_duan_end,
                    endYearFlag: values.exactFlag_duan_nianhao_end
                }
            }
        }
        Modal.confirm({
            title: '确认提交吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                console.log("submit param:", submitParam);
                props.onSubmit(submitParam);
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

    const selectGongyuan = (
        <Select className="select-before">
            <Option value="ad">公元后</Option>
            <Option value="bc">公元前</Option>
        </Select>
    );
    const selectNianhao = (
        <Select className="select-before" showSearch
            optionFilterProp="children"
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
                    itemDes: "",
                    itemType: 1,
                    yearType: 1,
                    // 时间点事件
                    gongyuan_dian: 'ad',   // 选择公元前/公元后
                    exactFlag_dian_gongyuan: false,  // 是否确切时间-公元
                    nianhao_dian: '1',      // 选择年号
                    exactFlag_dian_nianhao: false,   // 是否确切时间-年号
                    // 时间段事件
                    gongyuan_duan_start: 'ad',  // 选择公元前/公元后 - 开始时间
                    gongyuan_duan_end: 'ad',   // 选择公元前/公元后 - 结束时间
                    nianhao_duan_start: '1',   // 选择年号 - 开始时间
                    nianhao_duan_end: '1',   // 选择年号 - 结束时间
                    exactFlag_duan_gongyuan_start: false,  // 是否确切开始时间-公元
                    exactFlag_duan_gongyuan_end: false,    // 是否确切结束时间-公元
                    exactFlag_duan_nianhao_start: false,  // 是否确切开始时间-年号
                    exactFlag_duan_nianhao_end: false,  // 是否确切结束时间-年号
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
                    name="itemType"
                    label="时间类型选择:"
                >
                    <Radio.Group onChange={e => { setItemType(e.target.value) }}>
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
                {itemType === 1 ?  // 点时间
                    <>
                        {yearType === 1 ?   // 公元纪年

                            <Form.Item
                                label="事件时间:"
                                extra="年份处请填阿拉伯数字。 如时间精确到年,则年份后的时间可不填; 否则填入月日及时间,此处可只填写月份(如:02),也可只填写月日(如:02-01),还可填入月日及时间(如:02-01 12:53:36)"
                            >
                                <Row gutter={0}>
                                    <Col span={7}>
                                        <Form.Item
                                            name="gongyuan_dian"
                                        >
                                            {selectGongyuan}
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name="time_dian_gongyuan"
                                            rules={[{ required: true, message: '请填入事件时间!' }]}
                                        >
                                            <Input addonAfter="年" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={1} />
                                    <Col span={6}>
                                        <Form.Item
                                            name="exactFlag_dian_gongyuan"
                                            valuePropName="checked"
                                        >
                                            <Switch checkedChildren="确切" unCheckedChildren="粗略" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form.Item>

                            :

                            <Form.Item     // 点时间 - 年号纪年
                                label="事件时间:"
                                extra="年份处请填阿拉伯数字。 如时间精确到年,则年份后的时间可不填; 否则填入月日及时间,此处可只填写月份(如:02),也可只填写月日(如:02-01),还可填入月日及时间(如:02-01 12:53:36)"
                            >
                                <Row gutter={0}>
                                    <Col span={7}>
                                        <Form.Item
                                            name="nianhao_dian"
                                        >
                                            {selectNianhao}
                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>
                                        <Form.Item
                                            name="time_dian_nianhao"
                                            // label="事件时间:"
                                            rules={[{ required: true, message: '请填入事件时间!' }]}
                                        >
                                            <Input addonAfter="年" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={1} />
                                    <Col span={6}>
                                        <Form.Item
                                            name="exactFlag_dian_nianhao"
                                            valuePropName="checked"
                                        >
                                            <Switch checkedChildren="确切" unCheckedChildren="粗略" />
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
                                    <Row gutter={0}>
                                        <Col span={7}>
                                            <Form.Item
                                                name="gongyuan_duan_start"
                                            >
                                                {selectGongyuan}
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Form.Item
                                                name="startTime_duan_gongyuan"
                                                rules={[{ required: true, message: '请填入事件时间!' }]}
                                            >
                                                <Input addonAfter="年" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={1} />
                                        <Col span={6}>
                                            <Form.Item
                                                name="exactFlag_duan_gongyuan_start"
                                                valuePropName="checked"
                                            >
                                                <Switch checkedChildren="确切" unCheckedChildren="粗略" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item
                                    label="事件结束时间:"
                                    extra="年份处请填阿拉伯数字。 如时间精确到年,则年份后的时间可不填; 否则填入月日及时间,此处可只填写月份(如:02),也可只填写月日(如:02-01),还可填入月日及时间(如:02-01 12:53:36)"
                                >
                                    <Row gutter={0}>
                                        <Col span={7}>
                                            <Form.Item
                                                name="gongyuan_duan_end"
                                            >
                                                {selectGongyuan}
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Form.Item
                                                name="endTime_duan_gongyuan"
                                                rules={[{ required: true, message: '请填入事件时间!' }]}
                                            >
                                                <Input addonAfter="年" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={1} />
                                        <Col span={6}>
                                            <Form.Item
                                                name="exactFlag_duan_gongyuan_end"
                                                valuePropName="checked"
                                            >
                                                <Switch checkedChildren="确切" unCheckedChildren="粗略" />
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
                                    <Row gutter={0}>
                                        <Col span={7}>
                                            <Form.Item
                                                name="nianhao_duan_start"
                                            >
                                                {selectNianhao}
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Form.Item
                                                name="startTime_duan_nianhao"
                                                rules={[{ required: true, message: '请填入事件时间!' }]}
                                            >
                                                <Input addonAfter="年" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={1} />
                                        <Col span={6}>
                                            <Form.Item
                                                name="exactFlag_duan_nianhao_start"
                                                valuePropName="checked"
                                            >
                                                <Switch onChange={() => { }} checkedChildren="确切" unCheckedChildren="粗略" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item
                                    label="事件结束时间:"
                                    extra="年份处请填阿拉伯数字。 如时间精确到年,则年份后的时间可不填; 否则填入月日及时间,此处可只填写月份(如:02),也可只填写月日(如:02-01),还可填入月日及时间(如:02-01 12:53:36)"
                                >
                                    <Row gutter={0}>
                                        <Col span={7}>
                                            <Form.Item
                                                name="nianhao_duan_end"
                                            >
                                                {selectNianhao}
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Form.Item
                                                name="endTime_duan_nianhao"
                                                rules={[{ required: true, message: '请填入事件时间!' }]}
                                            >
                                                <Input addonAfter="年" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={1} />
                                        <Col span={6}>
                                            <Form.Item
                                                name="exactFlag_duan_nianhao_end"
                                                valuePropName="checked"
                                            >
                                                <Switch onChange={() => { }} checkedChildren="确切" unCheckedChildren="粗略" />
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
