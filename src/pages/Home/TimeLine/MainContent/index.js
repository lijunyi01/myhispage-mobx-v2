import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import timeLineState from '../index.state';
import MyCanvas from './MyCanvas';
import ProjItemCard from './ProjItemCard';
import './index.less';

function Index(props) {
    // console.log(props);
    let canvasParam = {
        'projectItems': toJS(timeLineState.activedProjectItems),
        'pxPerYear': timeLineState.pxPerYear,
        ...toJS(timeLineState.activedProjectData),
        'canvasChangeCount': timeLineState.canvasChangeCount
    };

    let { lastYear, earlyYear, pxPerYear, yearInterval, timeLineBeginYear } = canvasParam;
    let canvasHeight = (lastYear - earlyYear) * pxPerYear < 50 ? 300 : (lastYear - timeLineBeginYear + yearInterval) * pxPerYear + 50;
    // console.log("canvasParam:", canvasParam);
    console.log("canvasHeight:", canvasHeight);

    // 计算卡片左上角的x坐标（相对于id为 maincontent的父级div）
    let itemInMainParam = {};
    const getLeftPos = (index, topPos, timeLineBeginYear, pxPerYear) => {

        // let itemList = containerState.projectContents[projectId];

        // 列表区右侧整个区域的宽度，canvas只是其中的30%宽度
        let { mainContentDivWidth } = props

        let leftPos;

        if (index % 2 === 0) {
            leftPos = 40;
            if (index >= 2) {
                if (topPos === itemInMainParam[index - 2].topPos) {
                    leftPos = itemInMainParam[index - 2].leftPos - 15;

                } else if (Math.abs(topPos - itemInMainParam[index - 2].topPos) < 90) {
                    if (itemInMainParam[index - 2].leftPos === 40) {
                        leftPos = 50;
                    }
                }

            }
        } else {
            // leftPos = canvasWidth/0.3*0.65;
            leftPos = mainContentDivWidth * 0.65;
            if (index >= 2) {
                if (topPos === itemInMainParam[index - 2].topPos) {
                    leftPos = itemInMainParam[index - 2].leftPos + 15;

                } else if (Math.abs(topPos - itemInMainParam[index - 2].topPos) < 90) {
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
                    <MyCanvas {...canvasParam} canvasWidth={props.mainContentDivWidth * 0.3} canvasHeight={canvasHeight} />
                </div >

            </div >
            :
            ''
    )
}

export default observer(Index);
