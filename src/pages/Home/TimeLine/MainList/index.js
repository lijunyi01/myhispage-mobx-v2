import React, { useEffect } from 'react';
import { List, Space, Avatar } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import timeLineState from '../index.state';
import avatarIcon from '@assets/icon/time.png';
import './index.less';

// 定义了一个小的函数式组件
const IconText = ({ icon, text, handler }) => (
    <Space>
        <div onClick={handler}>
            {React.createElement(icon)}
            {text}
        </div>
    </Space>
);

function Index() {

    useEffect(() => {
        timeLineState.getAllProjectsMethod();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        // console.log("activeId:", timeLineState.activedProjectId);
        if (timeLineState.activedProjectId !== -1) {
            timeLineState.getProjectItemsMethod(timeLineState.activedProjectId);
        }
    }, [timeLineState.activedProjectId]);  // eslint-disable-line react-hooks/exhaustive-deps

    const handleEditClick = () => { };
    const handleAddProjItemClick = () => { };
    const handleDeleteClick = () => { };
    const handleClick = id => { timeLineState.setActivedProjectId(id) };

    return (
        <List
            itemLayout="vertical"
            dataSource={toJS(timeLineState.projectList)}
            bordered={true}
            size="large"
            renderItem={item => (

                <List.Item
                    key={item.id}
                    actions={[
                        <IconText icon={EditOutlined} text="edit" key="star-" handler={item.id === timeLineState.activedProjectId ? handleEditClick : null} />,
                        <IconText icon={PlusCircleOutlined} text="add" key="add-" handler={item.id === timeLineState.activedProjectId ? handleAddProjItemClick : null} />,
                        <IconText icon={DeleteOutlined} text="" key="like-" handler={item.id === timeLineState.activedProjectId ? handleDeleteClick : null} />
                    ]}

                    onClick={() => handleClick(item.id)}
                    className={item.id === timeLineState.activedProjectId ? 'activeItem' : 'normalItem'}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={avatarIcon} />}
                        title={item.projectname}
                        description={item.projectdes}
                    />
                    {item.content}
                </List.Item>
            )}
        >
        </List>
    )
}

export default observer(Index);