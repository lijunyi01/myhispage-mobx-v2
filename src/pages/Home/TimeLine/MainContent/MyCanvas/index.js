import React, { useEffect, useRef } from 'react';

//段时间事件矩形图的左右偏移参数,形如: {1:0,4:-10,5:10}
let itemParam = {};

function Index(props) {

    const canvasref = useRef(null);

    useEffect(() => {
        if (props.canvasChangeCount !== -1) {
            // console.log("canvas props:", props);
            drawArrow();
        }
    }, [props.canvasChangeCount, props.canvasWidth, props.canvasHeight])  // eslint-disable-line react-hooks/exhaustive-deps

    const drawArrow = () => {
        // console.log("MyCanvas didupdate:");
        // console.log(this.props);
        let { projectItems, pxPerYear, timeLineBeginYear, lastYear, earlyYear, yearInterval } = props;
        // console.log("MyCanvas didupdate:", this.props.canvasParam)

        if (pxPerYear !== -1 && yearInterval !== -1 && timeLineBeginYear !== -1) {

            const ctx = canvasref.current.getContext('2d');
            let canvasWidth = canvasref.current.offsetWidth;
            let canvasHeight = canvasref.current.offsetHeight;
            let lineLength = canvasHeight - 50;

            // console.log("linelength:"+ lineLength);

            let yearLength = lastYear - earlyYear;
            let marginTop = 30;

            //清画布
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            //画主时间箭头
            let canvasXCenterPos = parseInt(canvasWidth / 2);
            // console.log("xpos:", canvasXCenterPos)
            if (timeLineBeginYear < 0 && lastYear > 0) {
                //跨公元元年
                ctx.fillStyle = "rgba(169,169,169,0.2)";
                ctx.fillRect(canvasXCenterPos - 20, marginTop, 40, pxPerYear * (timeLineBeginYear * -1));
                ctx.fillStyle = "rgba(0,255,0,0.2)";
                ctx.fillRect(canvasXCenterPos - 20, pxPerYear * (timeLineBeginYear * -1) + marginTop, 40, lineLength - pxPerYear * (timeLineBeginYear * -1));

            } else if (timeLineBeginYear < 0 && lastYear <= 0) {
                //都在公元前
                ctx.fillStyle = "rgba(169,169,169,0.2)";
                ctx.fillRect(canvasXCenterPos - 20, marginTop, 40, lineLength);

            } else {
                //都在公元后
                ctx.fillStyle = "rgba(0,255,0,0.2)";
                ctx.fillRect(canvasXCenterPos - 20, marginTop, 40, lineLength);

            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(95,158,160,0.3)";
            ctx.moveTo(canvasXCenterPos - 20, lineLength + marginTop);
            ctx.lineTo(canvasXCenterPos - 30, lineLength + marginTop);
            ctx.lineTo(canvasXCenterPos, lineLength + 20 + marginTop);
            ctx.lineTo(canvasXCenterPos + 30, lineLength + marginTop);
            ctx.lineTo(canvasXCenterPos + 20, lineLength + marginTop);
            ctx.stroke();
            ctx.fill();

            //画整年份点以及年份数字
            //设置字体样式
            ctx.font = "10px Courier New";
            //设置字体填充颜色和圆点填充颜色
            ctx.fillStyle = "rgba(255,0,0,1)";
            for (let i = 0; i <= yearLength + yearInterval; i = i + yearInterval) {
                ctx.beginPath();
                if ((timeLineBeginYear + i) < 0) {
                    ctx.fillText((timeLineBeginYear + i) * -1, canvasXCenterPos - 15, i * pxPerYear + 15 + marginTop);
                    ctx.fillText('B.C.', canvasXCenterPos - 15, i * pxPerYear + 25 + marginTop);
                } else if ((timeLineBeginYear + i) === 0) {
                    ctx.fillText('1', canvasXCenterPos - 15, i * pxPerYear + 15 + marginTop);
                    ctx.fillText('A.D.', canvasXCenterPos - 15, i * pxPerYear + 25 + marginTop);
                } else {
                    ctx.fillText((timeLineBeginYear + i), canvasXCenterPos - 15, i * pxPerYear + 15 + marginTop);
                    ctx.fillText('A.D.', canvasXCenterPos - 15, i * pxPerYear + 25 + marginTop);
                }

                if (i > 0) {
                    ctx.arc(canvasXCenterPos, i * pxPerYear + marginTop, 5, 0, Math.PI * 2, true);
                }
                ctx.fill();
            }

            //画时间段或时间点
            for (let i = 0; i < projectItems.length; i++) {
                ctx.beginPath();
                if (projectItems[i].itemType <= 2) {    //点时间

                    ctx.fillStyle = "rgba(255,160,122,0.8)";
                    ctx.strokeStyle = "rgba(255,160,122,0.8)";

                    let showYear;
                    if (projectItems[i].startYear < 0) {
                        showYear = Math.abs(projectItems[i].startYear) + ' B.C.';
                    } else {
                        showYear = projectItems[i].startYear + ' A.D.';
                    }
                    if (i % 2 === 0) {    //偶数项,左边
                        ctx.arc(canvasXCenterPos - 40, (projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginTop, 5, 0, Math.PI * 2, true);
                        ctx.moveTo(canvasXCenterPos - 40, (projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginTop);
                        ctx.lineTo(canvasXCenterPos - parseInt(canvasWidth / 2), (projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginTop);
                        ctx.stroke();
                        ctx.fillText(showYear, canvasXCenterPos - 100, (projectItems[i].startYear - timeLineBeginYear) * pxPerYear - 10 + marginTop);
                    } else {    //奇数项,右边
                        ctx.arc(canvasXCenterPos + 42, (projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginTop, 5, 0, Math.PI * 2, true);
                        ctx.moveTo(canvasXCenterPos + 42, (projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginTop);
                        ctx.lineTo(canvasXCenterPos + parseInt(canvasWidth / 2), (projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginTop);
                        ctx.stroke();
                        ctx.fillText(showYear, canvasXCenterPos + 60, (projectItems[i].startYear - timeLineBeginYear) * pxPerYear - 10 + marginTop);
                    }
                    if (projectItems[i].startYearNDFlag === 0) {  //如果是确切年份才用实心圈,否则用空心圈
                        ctx.fill();
                    }
                } else {    //段时间
                    //矩形条柱左右偏移量
                    let marginLR = getMarginLR(i);
                    // console.log("marginLR:",marginLR)
                    if (marginLR === 0) {
                        ctx.fillStyle = "rgba(0,0,255,0.2)";
                        ctx.strokeStyle = "rgba(0,0,255,1)";
                    } else if (Math.abs(marginLR) === 10) {
                        ctx.fillStyle = "rgba(254,193,204,0.8)";
                        ctx.strokeStyle = "rgba(0,255,50,1)";
                    } else if (Math.abs(marginLR) === 20) {
                        ctx.fillStyle = "rgba(252,132,74,0.2)";
                        ctx.strokeStyle = "rgba(0,255,50,1)";
                    } else if (Math.abs(marginLR) === 30) {
                        ctx.fillStyle = "rgba(0,0,255,0.2)";
                        ctx.strokeStyle = "rgba(0,255,50,1)";
                    } else {
                        ctx.fillStyle = "rgba(0,0,50,0.2)";
                        ctx.strokeStyle = "rgba(0,0,50,1)";
                    }

                    let rectTopY = (projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginTop;
                    let rectHeight = (projectItems[i].endYear - projectItems[i].startYear) * pxPerYear;

                    if (i % 2 === 0) {    //偶数项,左边
                        //画矩形
                        ctx.fillRect(canvasXCenterPos - 30 + marginLR, rectTopY, 10, rectHeight);
                        ctx.fill();

                        //画三角形
                        ctx.moveTo(canvasXCenterPos - parseInt(canvasWidth / 2), rectTopY + rectHeight / 2 - 10);
                        ctx.lineTo(canvasXCenterPos - 20 - 10 + marginLR, rectTopY + rectHeight / 2);
                        ctx.lineTo(canvasXCenterPos - parseInt(canvasWidth / 2), rectTopY + rectHeight / 2 + 10);
                        ctx.closePath();
                        ctx.fill();

                        //写起止年份
                        ctx.fillStyle = "rgba(0,0,0,1)";
                        ctx.fillText(projectItems[i].startYear, canvasXCenterPos - parseInt(canvasWidth / 2) + 15, rectTopY + rectHeight / 2 - 15);
                        ctx.fillText(projectItems[i].endYear, canvasXCenterPos - parseInt(canvasWidth / 2) + 15, rectTopY + rectHeight / 2 + 20);

                        //如果起止年份有不确切的,在相应的矩形端加矩形标记
                        if (projectItems[i].startYearNDFlag === 1) {
                            ctx.strokeStyle = "rgba(0,0,50,1)";
                            ctx.strokeRect(canvasXCenterPos - 30 + marginLR + 1, rectTopY, 8, 5);
                        }
                        if (projectItems[i].endYearNDFlag === 1) {
                            ctx.strokeStyle = "rgba(0,0,50,1)";
                            ctx.strokeRect(canvasXCenterPos - 30 + marginLR + 1, rectTopY + rectHeight - 5, 8, 5);
                        }
                    } else {    //奇数项,右边

                        //画矩形
                        ctx.fillRect(canvasXCenterPos + 20 + marginLR, rectTopY, 10, rectHeight);
                        ctx.fill();

                        //画三角形
                        ctx.moveTo(canvasXCenterPos + parseInt(canvasWidth / 2), rectTopY + rectHeight / 2 - 10);
                        ctx.lineTo(canvasXCenterPos + 20 + 10 + marginLR, rectTopY + rectHeight / 2);
                        ctx.lineTo(canvasXCenterPos + parseInt(canvasWidth / 2), rectTopY + rectHeight / 2 + 10);
                        ctx.closePath();
                        ctx.fill();

                        //写起止年份
                        ctx.fillStyle = "rgba(0,0,0,1)";
                        ctx.fillText(projectItems[i].startYear, canvasXCenterPos + parseInt(canvasWidth / 2) - 45, rectTopY + rectHeight / 2 - 15);
                        ctx.fillText(projectItems[i].endYear, canvasXCenterPos + parseInt(canvasWidth / 2) - 45, rectTopY + rectHeight / 2 + 20);

                        //如果起止年份有不确切的,在相应的矩形端加矩形标记
                        if (projectItems[i].startYearNDFlag === 1) {
                            ctx.strokeStyle = "rgba(0,0,50,1)";
                            ctx.strokeRect(canvasXCenterPos + 20 + marginLR + 1, rectTopY, 8, 5);
                        }
                        if (projectItems[i].endYearNDFlag === 1) {
                            ctx.strokeStyle = "rgba(0,0,50,1)";
                            ctx.strokeRect(canvasXCenterPos + 20 + marginLR + 1, rectTopY + rectHeight - 5, 8, 5);
                        }
                    }

                }
            }

        }
    }

    //段时间事件矩形图的左右偏移参数
    const getMarginLR = index => {
        // let { projectItems } = props.canvasParam;
        let { projectItems } = props;
        let ret = 0;

        let hisLR = [];    //结束时间与当前事件开始时间冲突的事件的各偏移参数
        for (let l = index; l >= 0; l = l - 2) {
            if (itemParam[l - 2] !== undefined) {   //说明key:l-2 对应的是段事件
                if (projectItems[index].startYear <= projectItems[l - 2].endYear) {
                    hisLR.push(itemParam[l - 2]);
                }
            }
        }

        if (hisLR.length > 0) {
            if (index % 2 === 0) {   //偶数项,在左边的
                for (let k = 0; k > -41; k = k - 10) {
                    let inFlag = false;
                    for (let t = 0; t < hisLR.length; t++) {
                        if (k === hisLR[t]) {
                            inFlag = true;
                            break;
                        }
                    }
                    if (inFlag === false) {
                        ret = k;
                        break;
                    }
                }
            } else {    //奇数项,在右边的
                for (let k = 0; k < 41; k = k + 10) {
                    let inFlag = false;
                    for (let t = 0; t < hisLR.length; t++) {
                        if (k === hisLR[t]) {
                            inFlag = true;
                            break;
                        }
                    }
                    if (inFlag === false) {
                        ret = k;
                        break;
                    }
                }

            }
        }
        itemParam[index] = ret;
        return ret;
    }

    return (

        <canvas ref={canvasref} width={props.canvasWidth} height={props.canvasHeight} />
    )
}

export default Index;