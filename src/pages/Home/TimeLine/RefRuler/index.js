import React, { useState, useEffect } from 'react';
import './index.less';

const RulerItem = ({ index, mode, stage, beginYear, endYear, pxPerYear, rulerSYear, rulerEYear }) => {
    // console.log("endYear:", endYear);
    let endFlag = false;
    if (stage.endyear > beginYear && stage.startyear < endYear) {
        let length = 0;
        if (stage.startyear < beginYear) {
            length = (stage.endyear - beginYear) * pxPerYear;
        } else if (stage.endyear > endYear) {
            length = (endYear - stage.startyear) * pxPerYear;
            endFlag = true;
        } else {
            length = (stage.endyear - stage.startyear) * pxPerYear;
        }

        if (index === 0 && rulerSYear > beginYear) {
            const margin = (rulerSYear - beginYear) * pxPerYear;
            return <div className={endFlag ? "ruleritemend" : "ruleritem"} style={mode === 0 ? { 'width': length, 'marginLeft': margin } : { 'height': length, 'marginTop': margin }}> {stage.itemname}</div>
        } else {
            return <div className={endFlag ? "ruleritemend" : "ruleritem"} style={mode === 0 ? { 'width': length } : { 'height': length }}> {stage.itemname}</div>
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
        // console.log("props:", props);
        // 第一次加载或index变化时让不同的标尺错开显示
        if (props.mode === 0) {
            setTopPos(30 + props.index * 50);
        } else {
            setLeftPos(30 + props.index * 50);
        }

    }, [props.index]); // eslint-disable-line react-hooks/exhaustive-deps

    const onMouseMove = e => {
        if (mouseDownFlag) {
            // console.log(e.nativeEvent);
            if (props.mode === 0) {  // 横屏模式
                setTopPos(e.nativeEvent.clientY - 100);
            } else if (props.mode === 1) {   // 竖屏模式且菜单和mainlist都展开
                setLeftPos(e.nativeEvent.clientX - 475);
            } else if (props.mode === 2) {   // 竖屏模式且菜单展开 且 mainlist收起
                setLeftPos(e.nativeEvent.clientX - 240);
            } else if (props.mode === 3) {   // 竖屏模式且菜单收起 且 mainlist展开
                setLeftPos(e.nativeEvent.clientX - 360);
            } else {  // 竖屏模式且菜单和mainlist都收起
                setLeftPos(e.nativeEvent.clientX - 115);
            }
        }
    }

    const rulerLength = props.length - 50;   // 时间轴（除箭头外矩形部分的长度）props.length = canvasWidth
    // 标尺展示区域的最大年份（不是标尺本身的最大年份）
    const maxYear = props.beginYear + rulerLength / props.pxPerYear;
    // console.log("maxYear:", maxYear);
    return (
        props.mode === 0 ?
            <div className="ref-ruler-land"
                style={{ 'width': rulerLength, 'top': topPos }}
                onMouseDown={() => { setMouseDownFlag(true) }}
                onMouseUp={() => { setMouseDownFlag(false) }}
                onMouseOver={() => { setMouseDownFlag(false) }}
                onMouseMove={onMouseMove}
            >
                {
                    props.rulerData.stages.map((item, index) => {
                        // return <div className="ruleritem">{item.name}</div>
                        return <RulerItem key={index} mode={props.mode} index={index} stage={item} rulerSYear={props.rulerData.rulerSYear} rulerEYear={props.rulerData.rulerEYear} beginYear={props.beginYear} endYear={maxYear} pxPerYear={props.pxPerYear} />
                    })
                }

            </div>
            :
            <div className="ref-ruler"
                style={{ 'height': rulerLength, 'left': leftPos }}
                onMouseDown={() => { setMouseDownFlag(true) }}
                onMouseUp={() => { setMouseDownFlag(false) }}
                onMouseOver={() => { setMouseDownFlag(false) }}
                onMouseMove={onMouseMove}
            >
                {
                    props.rulerData.stages.map((item, index) => {
                        // return <div className="ruleritem">{item.name}</div>
                        // console.log("rulerid:", props.rulerId);
                        return <RulerItem key={index} mode={props.mode} index={index} stage={item} rulerSYear={props.rulerData.rulerSYear} rulerEYear={props.rulerData.rulerEYear} beginYear={props.beginYear} endYear={maxYear} pxPerYear={props.pxPerYear} />
                    })
                }


            </div>
    )
}

export default Index
