import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import timeLineState from '../index.state';
import MyCanvas from './MyCanvas';
import './index.less';

function Index(props) {
    // console.log(props);
    let canvasHeight = 1000;
    return (
        // <div>
        //     MainContent<br />
        //     {props.mainContentDivHeight}<br />
        //     {props.mainContentDivWidth}
        // </div>
        <div className="card-canvas-container">
            {/* {
                toJS(timeLineState.projectItems).map((item, index) => {
                    let topPos = 0;
                    topPos = this.getTopPos(index, timeLineBeginYear, pxPerYear);
                    let leftPos = 0;
                    leftPos = this.getLeftPos(index, topPos, timeLineBeginYear, pxPerYear);
                    itemInMainParam[index] = { 'topPos': topPos, 'leftPos': leftPos };
                    return <ProjItemCard key={item.itemId} leftPos={leftPos} topPos={topPos} cardParam={item} />
                })
            }*/}

            <div className="canvas-container" style={{ width: 2000 }}>
                {/* <div className="canvas-container" style={{ height: canvasHeight + 10 }}> */}
                {/* <MyCanvas canvasParam={null} canvasWidth={1000} canvasHeight={props.mainContentDivHeight * 0.3} /> */}
                {/* <MyCanvas canvasParam={null} canvasWidth={props.mainContentDivWidth * 0.3} canvasHeight={canvasHeight} /> */}
            </div>
        </div>
    )
}

export default observer(Index);
