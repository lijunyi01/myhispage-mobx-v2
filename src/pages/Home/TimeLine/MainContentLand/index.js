import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import timeLineState from '../index.state';
import MyCanvas from './MyCanvas';
import './index.less';
import ProjItemCard from './ProjItemCard';

function Index(props) {
    // console.log(props);
    let canvasParam = {
        'projectItems': toJS(timeLineState.activedProjectItems),
        'pxPerYear': timeLineState.pxPerYear,
        ...toJS(timeLineState.activedProjectData),
        'canvasChangeCount': timeLineState.canvasChangeCount
    };

    let { lastYear, earlyYear, pxPerYear, yearInterval, timeLineBeginYear } = canvasParam;
    let canvasWidth = (lastYear - earlyYear) * pxPerYear < 50 ? 300 : (lastYear - timeLineBeginYear + yearInterval) * pxPerYear + 50;

    // 计算卡片左上角的x坐标（相对于id为 maincontent的父级div）
    let itemInMainParam = {};

    // const getLeftPos2 = (index, topPos, timeLineBeginYear, pxPerYear) => {

    //     // let itemList = containerState.projectContents[projectId];

    //     // 列表区右侧整个区域的高度，canvas只是其中的30%宽度
    //     let { mainContentDivHeight } = props

    //     let leftPos;

    //     if (index % 2 === 0) {  // 偶数项，在下边
    //         leftPos = 40;
    //         if (index >= 2) {
    //             if (topPos === itemInMainParam[index - 2].topPos) {
    //                 leftPos = itemInMainParam[index - 2].leftPos - 15;

    //             } else if (Math.abs(topPos - itemInMainParam[index - 2].topPos) < 90) {
    //                 if (itemInMainParam[index - 2].leftPos === 40) {
    //                     leftPos = 50;
    //                 }
    //             }

    //         }
    //     } else {  // 奇数项，在上边
    //         // leftPos = canvasWidth/0.3*0.65;
    //         leftPos = mainContentDivWidth * 0.65;
    //         if (index >= 2) {
    //             if (topPos === itemInMainParam[index - 2].topPos) {
    //                 leftPos = itemInMainParam[index - 2].leftPos + 15;

    //             } else if (Math.abs(topPos - itemInMainParam[index - 2].topPos) < 90) {
    //                 if (itemInMainParam[index - 2].leftPos === leftPos) {
    //                     leftPos = leftPos - 10;
    //                 }
    //             }

    //         }
    //     }
    //     return leftPos;
    // }

    const getLeftPos = (index, timeLineBeginYear, pxPerYear) => {

        // let { containerState } = this.props;
        let marginLeft = 30;
        let leftPos = marginLeft;

        let { projectItems } = canvasParam;

        if (projectItems[index].itemType < 3) {    //点事件
            leftPos = (projectItems[index].startYear - timeLineBeginYear) * pxPerYear - 120 + marginLeft;
        } else {       //段事件
            let rectLeftX = (projectItems[index].startYear - timeLineBeginYear) * pxPerYear + marginLeft;
            let rectWidth = (projectItems[index].endYear - projectItems[index].startYear) * pxPerYear;
            leftPos = rectLeftX + rectWidth / 2 - 120;
        }

        return leftPos;
    }

    // 计算卡片左上角的y坐标（相对于id为 maincontent的父级div）
    const getTopPos = (index, leftPos, timeLineBeginYear, pxPerYear) => {

        const centerY = props.mainContentDivHeight / 2;
        const canvasContainerHeight = props.mainContentDivHeight * 0.3;

        let topPos = 150;
        if (index % 2 === 0) {  // 偶数项，在下边
            topPos = centerY + canvasContainerHeight / 2 - 2;
        } else {             // 奇数项，在上边
            topPos = centerY - canvasContainerHeight / 2 - 80;
        }
        return topPos;
    }

    return (
        canvasWidth ?
            <div className="card-canvas-container-land">
                {
                    toJS(timeLineState.activedProjectItems).map((item, index) => {
                        let topPos = 0;
                        let leftPos = 0;
                        leftPos = getLeftPos(index, timeLineBeginYear, pxPerYear);
                        topPos = getTopPos(index, leftPos, timeLineBeginYear, pxPerYear);
                        itemInMainParam[index] = { 'topPos': topPos, 'leftPos': leftPos };
                        return <ProjItemCard key={item.itemId} leftPos={leftPos} topPos={topPos} cardParam={item} />
                    })
                }

                < div className="canvas-container-land" style={{ width: canvasWidth + 10 }}>
                    <MyCanvas {...canvasParam} canvasWidth={canvasWidth} canvasHeight={props.mainContentDivHeight * 0.3} />
                </div >

            </div >
            :
            ''
    )
}

export default observer(Index);
