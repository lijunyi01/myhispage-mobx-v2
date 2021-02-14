import React from 'react';
import './index.less';
import { Tooltip, Space, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, LikeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ItemTip from './ItemTip';
import timeLineState from '../index.state';

const IconText = ({ icon, text, handler }) => (
    <Space>
        <div onClick={handler}>
            {React.createElement(icon)}
            {text}
        </div>
    </Space>
);

function Index(props) {
    let { cardParam, leftPos, topPos } = props;

    const handleClick = () => {
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
                    <div className="button1" onClick={
                        (event) => {
                            event.stopPropagation();
                            // let confirmModalContent = '您确认删除事件:"'+ componentState.itemName + '" 吗?';
                            // let confirmModalTitle = '删除事件确认';
                            // actions.showConfirm({delType:'DELITEM',title:confirmModalTitle,content:confirmModalContent,delId:componentState.itemId})
                        }
                    }>
                        {/* <IconText icon={LikeOutlined} text="like" key="like-" handler={this.handleClick}/> */}
                        <IconText icon={EditOutlined} text="" key="edit-" handler={handleClick} />
                    </div>
                </Tooltip>
                <Tooltip placement="bottom" title="Delete">
                    <div className="button2" onClick={
                        (event) => {
                            event.stopPropagation();
                            // actions.modifyItemButtonClick({itemId:componentState.itemId,itemName:componentState.itemName,itemIndex:index})
                        }
                    }>
                        <IconText icon={DeleteOutlined} text="" key="delete-" handler={handleClick} />
                    </div>
                </Tooltip>
                <Tooltip placement="bottom" title="prompt text3">
                    <div className="button3" onClick={
                        (event) => {
                            event.stopPropagation();
                            // actions.modifyTipsButtonClick({itemId:componentState.itemId,itemName:componentState.itemName,itemIndex:index})
                        }
                    }>
                        <IconText icon={LikeOutlined} text="" key="like-" handler={handleClick} />
                    </div>
                </Tooltip>
                <Tooltip placement="bottom" title="prompt text4">
                    <div className="button4" onClick={
                        (event) => {
                            event.stopPropagation();
                            // actions.showConfirm({title:confirmModalTitle,content:confirmModalContent,id:componentState.id})
                        }
                    }>
                        <IconText icon={LikeOutlined} text="" key="like-" handler={handleClick} />
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

export default Index;