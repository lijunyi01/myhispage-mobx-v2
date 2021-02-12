import React, { useEffect, useState } from 'react';
import { List, Space, Avatar, Modal } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import timeLineState from '../index.state';
import avatarIcon from '@assets/icon/time.png';
import './index.less';
import AddProjectItemModal from './AddProjectItemModal';

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

    // 控制AddProjecItemtModal的数据
    const [showAddProjItemModal, setShowAddProjItemModal] = useState(false);

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
    const handleAddProjItemClick = () => { setShowAddProjItemModal(true) };
    const handleDeleteClick = id => {
        Modal.confirm({
            title: '确认删除吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                timeLineState.deleteProjectMethod(id);
            }
            ,
            onCancel() {
            },
        });
    };
    const handleClick = id => { timeLineState.setActivedProjectId(id) };

    return (
        <>
            <List
                itemLayout="vertical"
                dataSource={toJS(timeLineState.projectList)}
                bordered={true}
                size="large"
                renderItem={item => (

                    <List.Item
                        key={item.id}
                        actions={[
                            <IconText icon={EditOutlined} text=" edit" key="star-" handler={item.id === timeLineState.activedProjectId ? handleEditClick : null} />,
                            <IconText icon={PlusCircleOutlined} text=" add" key="add-" handler={item.id === timeLineState.activedProjectId ? handleAddProjItemClick : null} />,
                            <IconText icon={DeleteOutlined} text="" key="like-" handler={item.id === timeLineState.activedProjectId ? () => handleDeleteClick(item.id) : null} />
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
            <AddProjectItemModal
                showFlag={showAddProjItemModal}
                onClose={() => setShowAddProjItemModal(false)}
                nianhaoList={timeLineState.nianhaoList}
                onSubmit={param => { timeLineState.createProjectMethod(param, () => { setShowAddProjItemModal(false) }); }}
            />
        </>
    )
}

export default observer(Index);
