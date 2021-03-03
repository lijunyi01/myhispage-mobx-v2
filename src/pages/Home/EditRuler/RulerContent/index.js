import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputNumber, Input, Popconfirm, Space } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import timeLineState from '@pages/home/timeLine/index.state';
import AddItemModal from './addItemModal';

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

    // console.log("rulerStages:", getRulerStages());
    // console.log("activeid:", timeLineState.activedRulerId);

    const [form] = Form.useForm();
    const [data, setData] = useState(getRulerStages());
    const [editingKey, setEditingKey] = useState(-1);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const isEditing = (record) => record.id === editingKey;

    useEffect(() => {
        setData(getRulerStages());
    }, [timeLineState.activedRulerId, timeLineState.rulersChangeFlag]) // eslint-disable-line react-hooks/exhaustive-deps

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

    const save = async (id) => {
        try {
            const row = await form.validateFields();
            console.log("row:", row);
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                // console.log("newData2:", newData)
                const param = {
                    'rulerId': newData[index].rulerid,
                    'itemId': id,
                    'itemName': newData[index].itemname,
                    'itemDes': newData[index].itemdes,
                    'startYear': newData[index].startyear,
                    'endYear': newData[index].endyear
                }
                timeLineState.updateRulerItemMethod(param);
                // setData(newData);
                setEditingKey(-1);
            } else {   // 用于新增
                newData.push(row);
                setData(newData);
                setEditingKey(-1);
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = itemId => {
        timeLineState.deleteRulerItemMethod(timeLineState.activedRulerId, itemId);
    }

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
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                    <Button type="primary" size="small" >Delete</Button>
                </Popconfirm>
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
                        <Popconfirm title="Sure to update?" onConfirm={() => save(record.id)}>
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
                                required: (dataIndex === 'itemdes' ? false : true),
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
        <>
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
                    footer={() => { return <Button type="primary" onClick={() => { setShowAddItemModal(true) }}>Add Row</Button> }}

                />
            </Form>
            <AddItemModal
                showFlag={showAddItemModal}
                onClose={() => setShowAddItemModal(false)}
                onSubmit={param => { timeLineState.createRulerItemMethod({ ...param, 'rulerId': timeLineState.activedRulerId }, () => { setShowAddItemModal(false); }); }}
            />
        </>

    )
}

export default observer(Index);
