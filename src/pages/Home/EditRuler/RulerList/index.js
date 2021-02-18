import React from 'react';
import { List, Space, Avatar } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import timeLineState from '@pages/Home/TimeLine/index.state';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import avatarIcon from '@assets/icon/time.png';

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

    const handleEditClick = () => { }
    const handleAddProjItemClick = () => { }
    const handleDeleteClick = () => { }
    const handleClick = () => { }

    return (
        <List
            itemLayout="vertical"
            dataSource={toJS(timeLineState.rulers)}
            bordered={true}
            size="large"
            renderItem={item => (

                <List.Item
                    key={item.id}
                    actions={[
                        <IconText icon={EditOutlined} text=" edit" key="star-" handler={item.id === timeLineState.activedRulerId ? handleEditClick : null} />,
                        <IconText icon={PlusCircleOutlined} text=" add" key="add-" handler={item.id === timeLineState.activedRulerId ? handleAddProjItemClick : null} />,
                        <IconText icon={DeleteOutlined} text="" key="like-" handler={item.id === timeLineState.activedRulerId ? () => handleDeleteClick(item.id) : null} />
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
