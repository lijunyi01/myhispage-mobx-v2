import React, { useState } from 'react';
import './index.less';
import { Tooltip, Space, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, FormOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ItemTip from './itemTip';
import timeLineState from '../index.state';
import EditTipModal from './editTipModal';
import EditModal from './editModal';

const IconText = ({ icon, text, handler }) => (
    <Space>
        <div onClick={handler}>
            {React.createElement(icon)}
            {text}
        </div>
    </Space>
);

function Index(props) {

    const [showEditTipModalFlag, setShowEditTipModalFlag] = useState(false);
    const [showEditModalFlag, setShowEditModalFlag] = useState(false);

    let { cardParam, leftPos, topPos } = props;

    // const handleClick = () => { };

    const handleEditClick = () => { setShowEditModalFlag(true) };

    const handleEditTipClick = () => { setShowEditTipModalFlag(true) };

    const handleDeleteClick = () => {
        Modal.confirm({
            title: '确认删除该item吗?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                timeLineState.deleteProjectItemMethod(cardParam.itemId);
            }
            ,
            onCancel() {
                // console.log('Cancel');
            },
        });
    };
    return (
        <div className="projItemCard" style={{ top: topPos, left: leftPos }}>
            <div className="itemNameArea">
                <div className="tFlag">
                    {cardParam.itemTipList.length > 0 ? <b>T</b> : <b></b>}
                </div>
                <div className="itemName">{cardParam.itemName}</div>
                <div className="fFlag">
                    {cardParam.itemFileList.length > 0 ? <b>F</b> : <b></b>}
                </div>
            </div>
            <div className="itemDes">{cardParam.itemContent}</div>
            <div className="itemTips">
                {
                    cardParam.itemTipList.map(
                        (item, index) => {
                            return <ItemTip key={item.id} tipContent={item.tipcontent} />
                        }
                    )
                }
            </div>

            {
                cardParam.itemType === 3 ?
                    <div className="itemTime">
                        <div className="startYear">{cardParam.startYear}</div>
                        <div className="periodYear">{cardParam.endYear - cardParam.startYear + 1}</div>
                        <div className="endYear">{cardParam.endYear}</div>
                    </div>
                    :
                    <div className="itemTime">
                        <div className="spotYear">{cardParam.startYear}</div>
                    </div>
            }


            <div className="itemButtons">
                <Tooltip placement="bottom" title="Edit">
                    <div className="button" >
                        <IconText icon={EditOutlined} text="" key="edit-" handler={handleEditClick} />
                    </div>
                </Tooltip>
                <Tooltip placement="bottom" title="Edit-Tips">
                    <div className="button" >
                        <IconText icon={FormOutlined} text="" key="like-" handler={handleEditTipClick} />
                    </div>
                </Tooltip>
                {/* <Tooltip placement="bottom" title="">
                    <div className="button" >
                        <IconText icon={LikeOutlined} text="" key="like2-" handler={handleClick} />
                    </div>
                </Tooltip> */}
                <Tooltip placement="bottom" title="Delete">
                    <div className="button" >
                        <IconText icon={DeleteOutlined} text="" key="delete-" handler={handleDeleteClick} />
                    </div>
                </Tooltip>
            </div>
            <EditTipModal showFlag={showEditTipModalFlag} onClose={() => { setShowEditTipModalFlag(false) }} projectId={timeLineState.activedProjectId} itemId={cardParam.itemId} />
            <EditModal showFlag={showEditModalFlag} nianhaoList={timeLineState.nianhaoList}
                onClose={() => { setShowEditModalFlag(false) }}
                itemInfo={cardParam}
                onSubmit={param => {
                    timeLineState.updateProjectItemMethod(
                        { ...param, 'projectId': timeLineState.activedProjectId },
                        () => { setShowEditModalFlag(false) }
                    )
                }} />
        </div>
    )
}

export default Index;