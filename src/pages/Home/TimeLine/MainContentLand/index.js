import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import timeLineState from '../index.state';
import MyCanvas from './myCanvas';
import './index.less';
import ProjItemCard from '../projItemCard';
import RefRuler from '../refRuler';

function Index(props) {
    // console.log(props);
    let canvasParam = {
        'projectItems': toJS(timeLineState.activedProjectItems),
        'pxPerYear': timeLineState.pxPerYear,
        ...toJS(timeLineState.activedProjectData),
        'canvasChangeCount': timeLineState.canvasChangeCount
    };

    let { lastYear, pxPerYear, yearInterval, timeLineBeginYear } = canvasParam;

    // console.log("lastYear:", lastYear);
    // console.log("earlyYear:", earlyYear);
    // console.log("timeLineBeginYear:", timeLineBeginYear);
    // let canvasWidth = (lastYear - earlyYear) * pxPerYear < 50 ? 300 : (lastYear - timeLineBeginYear + yearInterval) * pxPerYear + 50;
    let canvasWidth = (lastYear - timeLineBeginYear + yearInterval) * pxPerYear + 50;

    // 计算卡片左上角的x坐标（相对于id为 maincontent的父级div）
    let itemInMainParam = {};

    // canvas高度
    const canvasContainerHeight = props.mainContentDivHeight * 0.4;

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
    const getTopPos = (index, leftPos) => {

        const centerY = props.mainContentDivHeight / 2;

        let topPos;
        if (index % 2 === 0) {  // 偶数项，在下边
            topPos = centerY + canvasContainerHeight / 2 - 2;
            // 以下是进行错位处理
            if (index >= 2) {
                if (leftPos === itemInMainParam[index - 2].leftPos) {
                    topPos = itemInMainParam[index - 2].topPos + 15;

                } else if (Math.abs(leftPos - itemInMainParam[index - 2].leftPos) < 150) {
                    if (itemInMainParam[index - 2].topPos === topPos) {
                        topPos = topPos - 10;
                    }
                }

            }
        } else {             // 奇数项，在上边
            topPos = centerY - canvasContainerHeight / 2 - 80;
            // 以下是进行错位处理
            if (index >= 2) {
                if (leftPos === itemInMainParam[index - 2].leftPos) {
                    topPos = itemInMainParam[index - 2].topPos - 15;

                } else if (Math.abs(leftPos - itemInMainParam[index - 2].leftPos) < 150) {
                    if (itemInMainParam[index - 2].topPos === topPos) {
                        topPos = topPos + 10;
                    }
                }

            }
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
                    <MyCanvas {...canvasParam} canvasWidth={canvasWidth} canvasHeight={canvasContainerHeight} />
                </div >
                {
                    toJS(timeLineState.selectedRulers).map((item, index) => {
                        return <RefRuler key={item.id} index={index} mode={0} length={canvasWidth} beginYear={timeLineBeginYear} pxPerYear={pxPerYear} rulerData={item} />
                    })
                }
            </div >
            :
            ''
    )
}

export default observer(Index);
