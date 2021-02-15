import React from 'react';
import { toJS } from 'mobx';
import timeLineState from '@pages/Home/TimeLine/index.state';

function index(props) {


    const getItemTips = () => {
        const tmpItems = toJS(timeLineState.activedProjectItems).filter(item => {
            return item.itemId === props.itemId;
        });
        let currentItem = null;
        if (tmpItems.length === 1) {
            currentItem = tmpItems[0];
        }
        if (currentItem) {
            return currentItem.itemTipList;
        } else {
            return [];
        }

    }

    const itemTips = getItemTips();
    console.log("tips:", itemTips);

    return (
        <div>
            {itemTips.length > 0 ?
                itemTips.map(item => {
                    return <div>{item.tipcontent}</div>
                })
                :
                <div>空</div>
            }
        </div>
    )
}

export default index
