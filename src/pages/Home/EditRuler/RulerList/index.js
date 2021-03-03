import React, { useEffect } from 'react';
import { List, Space, Avatar, Modal } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import timeLineState from '@pages/home/timeLine/index.state';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import avatarIcon from '@assets/icon/ruler.png';

// 定义了一个小的函数式组件
const IconText = ({ icon, text, handler }) => (
    <Space>
        <div onClick={handler} style={handler ? { 'cursor': 'pointer' } : {}}>
            {React.createElement(icon)}
            {text}
        </div>
    </Space>
);

function Index() {

    useEffect(() => {
        if (timeLineState.rulers.length === 0) {
            timeLineState.getRulersMethod(true);
        }
    }, [])

    // console.log("activedRulerId:", timeLineState.activedRulerId);

    const handleEditClick = () => { }
    // const handleAddProjItemClick = () => { }
    const handleDeleteClick = id => {
        Modal.confirm({
            title: '确认删除吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                timeLineState.deleteRulerMethod(id);
            }
            ,
            onCancel() {
            },
        });
    }
    const handleClick = id => {
        timeLineState.setActivedRulerId(id)
    }

    return (
        <List
            itemLayout="vertical"
            dataSource={toJS(timeLineState.rulers)}
            bordered={true}
            size="large"
            // 以下是为了让组件观察timeLineState.activedRulerId 特地加的，没有实际用处！！！
            activedrulerid={timeLineState.activedRulerId}
            renderItem={item => (

                <List.Item
                    key={item.id}
                    actions={[
                        <IconText icon={EditOutlined} text=" edit" key="star-" handler={item.id === timeLineState.activedRulerId ? handleEditClick : null} />,
                        // <IconText icon={PlusCircleOutlined} text=" add" key="add-" handler={item.id === timeLineState.activedRulerId ? handleAddProjItemClick : null} />,
                        <IconText icon={DeleteOutlined} text="del" key="like-" handler={item.id === timeLineState.activedRulerId ? () => handleDeleteClick(item.id) : null} />
                    ]}

                    onClick={() => handleClick(item.id)}
                    className={item.id === timeLineState.activedRulerId ? 'activeItem' : 'normalItem'}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={avatarIcon} />}
                        title={item.rulerName}
                        description={item.rulerDes}
                    />
                </List.Item>
            )}
        >
        </List>
    )
}

export default observer(Index);
