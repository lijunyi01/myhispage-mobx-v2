import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import timeLineState from '../index.state';
import MyCanvas from './MyCanvas';
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
    // console.log("canvasHeight:", canvasHeight);

    return (
        // <div>
        //     MainContent<br />
        //     {props.mainContentDivHeight}<br />
        //     {props.mainContentDivWidth}
        // </div>
        <div className="card-canvas-container">
            {/* projectItems 数据没获得时 canvasHeight 为NaN,此时不渲染，避免报错*/}
            { canvasHeight ?
                /* {
                    toJS(timeLineState.projectItems).map((item, index) => {
                        let topPos = 0;
                        topPos = this.getTopPos(index, timeLineBeginYear, pxPerYear);
                        let leftPos = 0;
                        leftPos = this.getLeftPos(index, topPos, timeLineBeginYear, pxPerYear);
                        itemInMainParam[index] = { 'topPos': topPos, 'leftPos': leftPos };
                        return <ProjItemCard key={item.itemId} leftPos={leftPos} topPos={topPos} cardParam={item} />
                    })
                }*/


                <div className="canvas-container" style={{ height: canvasHeight + 10 }}>
                    <MyCanvas {...canvasParam} canvasWidth={props.mainContentDivWidth * 0.3} canvasHeight={canvasHeight} />
                </div>
                :
                ''
            }
        </div>
    )
}

export default observer(Index);
