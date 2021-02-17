import React, { useState, useEffect } from 'react';
import './index.less';

const RulerItem = ({ index, mode, stage, beginYear, lastYear, pxPerYear, rulerSYear, rulerEYear }) => {
    console.log("lastYear:", lastYear);
    if (stage.endyear > beginYear && stage.startyear < lastYear) {
        let length = 0;
        if (stage.startyear < beginYear) {
            length = (stage.endyear - beginYear) * pxPerYear;
        } else {
            length = (stage.endyear - stage.startyear) * pxPerYear;
        }

        if (index === 0 && rulerSYear > beginYear) {
            const margin = (rulerSYear - beginYear) * pxPerYear;
            return <div className="ruleritem" style={mode === 0 ? { 'width': length, 'marginLeft': margin } : { 'height': length, 'marginTop': margin }}> {stage.itemname}</div>
        } else {
            return <div className="ruleritem" style={mode === 0 ? { 'width': length } : { 'height': length }}> {stage.itemname}</div>
        }

    } else {
        return ""
    }

}

function Index(props) {
    // 横屏模式下标尺左上角相对父容器Y偏移量
    const [topPos, setTopPos] = useState(30);
    // 竖屏模式下标尺左上角相对父容器X偏移量
    const [leftPos, setLeftPos] = useState(30);
    const [mouseDownFlag, setMouseDownFlag] = useState(false);

    useEffect(() => {
        // 第一次加载时让不同的标尺错开显示
        if (props.index > 0) {
            if (props.mode === 0) {
                setTopPos(topPos + props.index * 50);
            } else {
                setLeftPos(leftPos + props.index * 50);
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onMouseMove = e => {
        if (mouseDownFlag) {
            // console.log(e.nativeEvent);
            if (props.mode === 0) {  // 横屏模式
                setTopPos(e.nativeEvent.clientY - 100);
            } else {   // 竖屏模式
                setLeftPos(e.nativeEvent.clientX - 480);
            }
        }
    }
    return (
        props.mode === 0 ?
            <div className="ref-ruler-land"
                style={{ 'width': props.length - 50, 'top': topPos }}
                onMouseDown={() => { setMouseDownFlag(true) }}
                onMouseUp={() => { setMouseDownFlag(false) }}
                onMouseOver={() => { setMouseDownFlag(false) }}
                onMouseMove={onMouseMove}
            >
                {
                    props.rulerData.stages.map((item, index) => {
                        // return <div className="ruleritem">{item.name}</div>
                        return <RulerItem key={index} mode={props.mode} index={index} stage={item} rulerSYear={props.rulerData.rulerSYear} rulerEYear={props.rulerData.rulerEYear} beginYear={props.beginYear} lastYear={props.lastYear} pxPerYear={props.pxPerYear} />
                    })
                }

            </div>
            :
            <div className="ref-ruler"
                style={{ 'height': props.length - 50, 'left': leftPos }}
                onMouseDown={() => { setMouseDownFlag(true) }}
                onMouseUp={() => { setMouseDownFlag(false) }}
                onMouseOver={() => { setMouseDownFlag(false) }}
                onMouseMove={onMouseMove}
            >
                {
                    props.rulerData.stages.map((item, index) => {
                        // return <div className="ruleritem">{item.name}</div>
                        return <RulerItem key={index} mode={props.mode} index={index} stage={item} rulerSYear={props.rulerData.rulerSYear} rulerEYear={props.rulerData.rulerEYear} beginYear={props.beginYear} lastYear={props.lastYear} pxPerYear={props.pxPerYear} />
                    })
                }


            </div>
    )
}

export default Index
