import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import timeLineState from '../index.state';
import MyCanvas from './MyCanvas';
import ProjItemCard from '../ProjItemCard';
import './index.less';
import RefRuler from '../RefRuler';

function Index(props) {
    // console.log(props);
    let canvasParam = {
        'projectItems': toJS(timeLineState.activedProjectItems),
        'pxPerYear': timeLineState.pxPerYear,
        ...toJS(timeLineState.activedProjectData),
        'canvasChangeCount': timeLineState.canvasChangeCount
    };

    let { lastYear, pxPerYear, yearInterval, timeLineBeginYear } = canvasParam;
    // let canvasHeight = (lastYear - earlyYear) * pxPerYear < 50 ? 300 : (lastYear - timeLineBeginYear + yearInterval) * pxPerYear + 50;
    let canvasHeight = (lastYear - timeLineBeginYear + yearInterval) * pxPerYear + 50;
    // console.log("canvasParam:", canvasParam);
    // console.log("canvasHeight:", canvasHeight);

    // 计算卡片左上角的x坐标（相对于id为 maincontent的父级div）
    let itemInMainParam = {};
    // canvas宽度
    const canvasContainerWidth = props.mainContentDivWidth * 0.3;

    const getLeftPos = (index, topPos) => {

        const centerX = props.mainContentDivWidth / 2;

        let leftPos;

        if (index % 2 === 0) {   // 偶数项，在左边
            leftPos = centerX - canvasContainerWidth / 2 - 235;
            // 以下是进行错位处理
            if (index >= 2) {
                if (topPos === itemInMainParam[index - 2].topPos) {
                    leftPos = itemInMainParam[index - 2].leftPos - 15;

                } else if (Math.abs(topPos - itemInMainParam[index - 2].topPos) < 80) {
                    if (itemInMainParam[index - 2].leftPos === 40) {
                        leftPos = 50;
                    }
                    if (itemInMainParam[index - 2].leftPos === leftPos) {
                        leftPos = leftPos + 10;
                    }
                }

            }
        } else {   // 奇数项，在右边
            leftPos = leftPos = centerX + canvasContainerWidth / 2 - 1;
            // 以下是进行错位处理
            if (index >= 2) {
                if (topPos === itemInMainParam[index - 2].topPos) {
                    leftPos = itemInMainParam[index - 2].leftPos + 15;

                } else if (Math.abs(topPos - itemInMainParam[index - 2].topPos) < 80) {
                    if (itemInMainParam[index - 2].leftPos === leftPos) {
                        leftPos = leftPos - 10;
                    }
                }

            }
        }
        return leftPos;
    }

    // 计算卡片左上角的y坐标（相对于id为 maincontent的父级div）
    const getTopPos = (index, timeLineBeginYear, pxPerYear) => {

        // let { containerState } = this.props;
        let marginTop = 30;
        let topPos = marginTop;

        let { projectItems } = canvasParam;

        if (projectItems[index].itemType < 3) {    //点事件
            topPos = (projectItems[index].startYear - timeLineBeginYear) * pxPerYear - 40 + marginTop;
        } else {       //段事件
            let rectTopY = (projectItems[index].startYear - timeLineBeginYear) * pxPerYear + marginTop;
            let rectHeight = (projectItems[index].endYear - projectItems[index].startYear) * pxPerYear;
            topPos = rectTopY + rectHeight / 2 - 40;
        }

        return topPos;
    }

    return (
        canvasHeight ?
            <div className="card-canvas-container">
                {
                    toJS(timeLineState.activedProjectItems).map((item, index) => {
                        let topPos = 0;
                        topPos = getTopPos(index, timeLineBeginYear, pxPerYear);
                        let leftPos = 0;
                        leftPos = getLeftPos(index, topPos, timeLineBeginYear, pxPerYear);
                        itemInMainParam[index] = { 'topPos': topPos, 'leftPos': leftPos };
                        return <ProjItemCard key={item.itemId} leftPos={leftPos} topPos={topPos} cardParam={item} />
                    })
                }

                < div className="canvas-container" style={{ height: canvasHeight + 10 }}>
                    <MyCanvas {...canvasParam} canvasWidth={canvasContainerWidth} canvasHeight={canvasHeight} />
                </div >
                {
                    toJS(timeLineState.selectedRulers).map((item, index) => {
                        // console.log("rulerindex:", index);
                        let mode = 1;
                        if (timeLineState.layoutMenuModelFlag && !timeLineState.mainListModelFlag) {
                            // 菜单默认展开 且 mainlist 收起时
                            mode = 2;
                        } else if (!timeLineState.layoutMenuModelFlag && timeLineState.mainListModelFlag) {
                            // 菜单收起 且 mainlist 默认展开
                            mode = 3;
                        } else if (!timeLineState.layoutMenuModelFlag && !timeLineState.mainListModelFlag) {
                            // 菜单 和 mainlist 都收起时
                            mode = 4;
                        } else {
                            mode = 1;
                        }
                        return <RefRuler key={item.id} index={index} mode={mode} length={canvasHeight} beginYear={timeLineBeginYear} pxPerYear={pxPerYear} rulerData={item} />
                    })
                }
            </div >
            :
            ''
    )
}

export default observer(Index);
