import React from 'react';
import { Table, Button } from 'antd';
// import { observer } from 'mobx-react';
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

    const rulerStages = getRulerStages();
    // console.log("rulerStages:", rulerStages);

    const columns = [
        {
            title: '名称',
            dataIndex: 'itemname',
            key: 'itemname',
            // width: 370,
        },
        {
            title: '描述',
            dataIndex: 'itemdes',
            key: 'itemdes',
            // width: 370,
        },
        {
            title: '起始年份',
            dataIndex: 'startyear',
            key: 'startyear',
            // width: 370,
        },
        {
            title: '截止年份',
            dataIndex: 'endyear',
            key: 'endyear',
            // width: 370,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" onClick={() => { }}>Delete</Button>
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={rulerStages}
                rowKey="id"
                columns={columns}
                bordered
                scroll={{ y: 400 }}
                pagination={false}
                title={() => { return <h2>标尺项目信息</h2> }}
                footer={() => { return <Button type="primary">Add Row</Button> }}

            />
        </div>
    )
}

export default Index
