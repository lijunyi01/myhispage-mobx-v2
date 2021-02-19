import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputNumber, Input, Popconfirm, Space } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import timeLineState from '@pages/Home/TimeLine/index.state';

function Index() {

    const getRulerStages = () => {
        const tmpItems = toJS(timeLineState.rulers).filter(item => {
            return item.id === timeLineState.activedRulerId;
        });
        if (tmpItems.length === 1) {
            return tmpItems[0].stages;
        } else {
            return [];
        }

    }

    console.log("rulerStages:", getRulerStages());
    console.log("activeid:", timeLineState.activedRulerId);

    const [form] = Form.useForm();
    const [data, setData] = useState(getRulerStages());
    const [editingKey, setEditingKey] = useState(-1);
    const isEditing = (record) => record.id === editingKey;

    useEffect(() => {
        setData(getRulerStages());
    }, [timeLineState.activedRulerId]) // eslint-disable-line react-hooks/exhaustive-deps

    const edit = (record) => {
        form.setFieldsValue({
            itemname: '',
            itemdes: '',
            startyear: 0,
            endyear: 0,
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey(-1);
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey(-1);
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey(-1);
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: '名称',
            dataIndex: 'itemname',
            key: 'itemname',
            width: '10%',
            editable: true,
        },
        {
            title: '描述',
            dataIndex: 'itemdes',
            key: 'itemdes',
            width: '20%',
            editable: true,
        },
        {
            title: '起始年份',
            dataIndex: 'startyear',
            key: 'startyear',
            width: '10%',
            editable: true,
        },
        {
            title: '截止年份',
            dataIndex: 'endyear',
            key: 'endyear',
            width: '10%',
            editable: true,
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            width: '10%',
            render: (text, record) => (
                <Button type="primary" size="small" onClick={() => { }}>Delete</Button>
            ),
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            width: '15%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Popconfirm title="Sure to cancel?" onConfirm={() => save(record.key)}>
                            <Button size="small" type="primary">
                                Save
                            </Button>
                        </Popconfirm>
                        <Button size="small" type="primary" onClick={cancel}>Cancel</Button>
                    </Space>
                ) : (
                        <Button size="small" type="primary" disabled={editingKey !== -1} onClick={() => edit(record)}>
                            Edit
                        </Button>
                    );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: (col.dataIndex === 'startyear' || col.dataIndex === 'endyear') ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                dataSource={data}
                rowKey="id"
                columns={mergedColumns}
                bordered
                scroll={{ y: 360 }}
                pagination={false}
                title={() => { return <h3>标尺项目信息：</h3> }}
                footer={() => { return <Button type="primary">Add Row</Button> }}

            />
        </Form>
    )
}

export default observer(Index);
