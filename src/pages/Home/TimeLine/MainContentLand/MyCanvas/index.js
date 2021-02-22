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
            let lineLength = canvasWidth - 50;

            // console.log("linelength:"+ lineLength);

            let yearLength = lastYear - earlyYear;
            let marginLeft = 30;

            //清画布
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            //画主时间箭头
            let canvasYCenterPos = parseInt(canvasHeight / 2);
            // console.log("ypos:", canvasYCenterPos)
            if (timeLineBeginYear < 0 && lastYear > 0) {
                //跨公元元年
                ctx.fillStyle = "rgba(169,169,169,0.2)";
                // ctx.fillRect(canvasXCenterPos - 20, marginTop, 40, pxPerYear * (timeLineBeginYear * -1));
                ctx.fillRect(marginLeft, canvasYCenterPos - 20, pxPerYear * (timeLineBeginYear * -1), 40);
                ctx.fillStyle = "rgba(0,255,0,0.2)";
                // ctx.fillRect(canvasXCenterPos - 20, pxPerYear * (timeLineBeginYear * -1) + marginTop, 40, lineLength - pxPerYear * (timeLineBeginYear * -1));
                ctx.fillRect(pxPerYear * (timeLineBeginYear * -1) + marginLeft, canvasYCenterPos - 20, lineLength - pxPerYear * (timeLineBeginYear * -1), 40);

            } else if (timeLineBeginYear < 0 && lastYear <= 0) {
                //都在公元前
                ctx.fillStyle = "rgba(169,169,169,0.2)";
                // ctx.fillRect(canvasXCenterPos - 20, marginTop, 40, lineLength);
                ctx.fillRect(marginLeft, canvasYCenterPos - 20, lineLength, 40);

            } else {
                //都在公元后
                ctx.fillStyle = "rgba(0,255,0,0.2)";
                // ctx.fillRect(canvasXCenterPos - 20, marginTop, 40, lineLength);
                ctx.fillRect(marginLeft, canvasYCenterPos - 20, lineLength, 40);

            }
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(95,158,160,0.3)";
            ctx.moveTo(lineLength + marginLeft, canvasYCenterPos - 20);
            ctx.lineTo(lineLength + marginLeft, canvasYCenterPos - 30);
            ctx.lineTo(lineLength + 20 + marginLeft, canvasYCenterPos);
            ctx.lineTo(lineLength + marginLeft, canvasYCenterPos + 30);
            ctx.lineTo(lineLength + marginLeft, canvasYCenterPos + 20);
            ctx.stroke();
            ctx.fill();

            //画整年份点以及年份数字
            //设置字体样式
            ctx.font = "10px Courier New";
            // //设置字体填充颜色和圆点填充颜色
            ctx.fillStyle = "rgba(255,0,0,1)";
            for (let i = 0; i <= yearLength + yearInterval; i = i + yearInterval) {
                ctx.beginPath();
                if ((timeLineBeginYear + i) < 0) {
                    ctx.fillText((timeLineBeginYear + i) * -1, i * pxPerYear + 10 + marginLeft, canvasYCenterPos - 2);
                    ctx.fillText('B.C.', i * pxPerYear + 10 + marginLeft, canvasYCenterPos + 8);
                } else if ((timeLineBeginYear + i) === 0) {
                    ctx.fillText('1', i * pxPerYear + 10 + marginLeft, canvasYCenterPos - 2);
                    ctx.fillText('A.D.', i * pxPerYear + 10 + marginLeft, canvasYCenterPos + 8);
                } else {
                    ctx.fillText((timeLineBeginYear + i), i * pxPerYear + 10 + marginLeft, canvasYCenterPos - 2);
                    ctx.fillText('A.D.', i * pxPerYear + 10 + marginLeft, canvasYCenterPos + 8);
                }

                if (i > 0) {
                    ctx.arc(i * pxPerYear + marginLeft, canvasYCenterPos, 5, 0, Math.PI * 2, true);
                }
                ctx.fill();
            }

            //画时间段或时间点
            for (let i = 0; i < projectItems.length; i++) {
                ctx.beginPath();
                if (projectItems[i].itemType <= 2) {    //点时间

                    ctx.fillStyle = "rgba(255,160,122,0.8)";
                    ctx.strokeStyle = "rgba(255,160,122,0.8)";

                    let showYear = Math.abs(projectItems[i].startYear);
                    // if (projectItems[i].startYear < 0) {
                    //     showYear = Math.abs(projectItems[i].startYear) + ' B.C.';
                    // } else {
                    //     showYear = projectItems[i].startYear + ' A.D.';
                    // }
                    if (i % 2 === 0) {    //偶数项,下边
                        ctx.arc((projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginLeft, canvasYCenterPos + 40, 5, 0, Math.PI * 2, true);
                        ctx.moveTo((projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginLeft, canvasYCenterPos + 40);
                        ctx.lineTo((projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginLeft, canvasYCenterPos + parseInt(canvasWidth / 2));
                        ctx.stroke();
                        ctx.fillText(showYear, (projectItems[i].startYear - timeLineBeginYear) * pxPerYear + 3 + marginLeft, canvasYCenterPos + 60);
                    } else {    //奇数项,上边
                        ctx.arc((projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginLeft, canvasYCenterPos - 40, 5, 0, Math.PI * 2, true);
                        ctx.moveTo((projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginLeft, canvasYCenterPos - 40);
                        ctx.lineTo((projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginLeft, canvasYCenterPos - parseInt(canvasWidth / 2));
                        ctx.stroke();
                        ctx.fillText(showYear, (projectItems[i].startYear - timeLineBeginYear) * pxPerYear + 3 + marginLeft, canvasYCenterPos - 60);
                    }
                    if (projectItems[i].startYearNDFlag === 0) {  //如果是确切年份才用实心圈,否则用空心圈
                        ctx.fill();
                    }
                } else {    //段时间
                    //矩形条柱上下偏移量
                    let marginUD = getMarginUD(i);
                    // console.log("marginUD:", marginUD);
                    if (marginUD === 0) {
                        ctx.fillStyle = "rgba(0,0,255,0.2)";
                        ctx.strokeStyle = "rgba(0,0,255,1)";
                    } else if (Math.abs(marginUD) === 10) {
                        ctx.fillStyle = "rgba(254,193,204,0.8)";
                        ctx.strokeStyle = "rgba(0,255,50,1)";
                    } else if (Math.abs(marginUD) === 20) {
                        ctx.fillStyle = "rgba(252,132,74,0.2)";
                        ctx.strokeStyle = "rgba(0,255,50,1)";
                    } else if (Math.abs(marginUD) === 30) {
                        ctx.fillStyle = "rgba(0,0,255,0.2)";
                        ctx.strokeStyle = "rgba(0,255,50,1)";
                    } else {
                        ctx.fillStyle = "rgba(0,0,50,0.2)";
                        ctx.strokeStyle = "rgba(0,0,50,1)";
                    }

                    // let rectTopY = (projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginTop;
                    // let rectHeight = (projectItems[i].endYear - projectItems[i].startYear) * pxPerYear;
                    let rectLeftX = (projectItems[i].startYear - timeLineBeginYear) * pxPerYear + marginLeft;
                    let rectWidth = (projectItems[i].endYear - projectItems[i].startYear) * pxPerYear;

                    if (i % 2 === 0) {    //偶数项,下边
                        //画矩形
                        ctx.fillRect(rectLeftX, canvasYCenterPos + 20 + marginUD, rectWidth, 10);
                        ctx.fill();

                        //画三角形
                        ctx.moveTo(rectLeftX + rectWidth / 2 - 10, canvasYCenterPos + parseInt(canvasHeight / 2));
                        ctx.lineTo(rectLeftX + rectWidth / 2, canvasYCenterPos + 20 + 10 + marginUD);
                        ctx.lineTo(rectLeftX + rectWidth / 2 + 10, canvasYCenterPos + parseInt(canvasHeight / 2));
                        ctx.closePath();
                        ctx.fill();

                        //写起止年份
                        ctx.fillStyle = "rgba(0,0,0,1)";
                        ctx.fillText(projectItems[i].startYear, rectLeftX + rectWidth / 2 - 35, canvasYCenterPos + 20 + 10 + marginUD + 20);
                        ctx.fillText(projectItems[i].endYear, rectLeftX + rectWidth / 2 + 10, canvasYCenterPos + 20 + 10 + marginUD + 20);

                        // 如果起止年份有不确切的,在相应的矩形端加矩形标记
                        if (projectItems[i].startYearNDFlag === 1) {
                            ctx.strokeStyle = "rgba(0,0,50,1)";
                            ctx.strokeRect(rectLeftX, canvasYCenterPos + 20 + marginUD + 1, 8, 7);
                        }
                        if (projectItems[i].endYearNDFlag === 1) {
                            ctx.strokeStyle = "rgba(0,0,50,1)";
                            // ctx.strokeRect(canvasXCenterPos - 30 + marginLR + 1, rectTopY + rectHeight - 5, 8, 5);
                            ctx.strokeRect(rectLeftX + rectWidth - 8, canvasYCenterPos + 20 + marginUD + 1, 8, 7);
                        }
                    } else {    //奇数项,上边

                        //画矩形
                        ctx.fillRect(rectLeftX, canvasYCenterPos - 30 + marginUD, rectWidth, 10);
                        ctx.fill();

                        //画三角形
                        ctx.moveTo(rectLeftX + rectWidth / 2 - 10, canvasYCenterPos - parseInt(canvasHeight / 2));
                        ctx.lineTo(rectLeftX + rectWidth / 2, canvasYCenterPos - 20 - 10 + marginUD);
                        ctx.lineTo(rectLeftX + rectWidth / 2 + 10, canvasYCenterPos - parseInt(canvasHeight / 2));
                        ctx.closePath();
                        ctx.fill();

                        //写起止年份
                        ctx.fillStyle = "rgba(0,0,0,1)";
                        ctx.fillText(projectItems[i].startYear, rectLeftX + rectWidth / 2 - 35, canvasYCenterPos - 20 - 10 + marginUD - 20);
                        ctx.fillText(projectItems[i].endYear, rectLeftX + rectWidth / 2 + 10, canvasYCenterPos - 20 - 10 + marginUD - 20);

                        //如果起止年份有不确切的,在相应的矩形端加矩形标记
                        if (projectItems[i].startYearNDFlag === 1) {
                            ctx.strokeStyle = "rgba(0,0,50,1)";
                            ctx.strokeRect(rectLeftX, canvasYCenterPos - 20 - 10 + marginUD + 1, 8, 7);
                        }
                        if (projectItems[i].endYearNDFlag === 1) {
                            ctx.strokeStyle = "rgba(0,0,50,1)";
                            // ctx.strokeRect(canvasXCenterPos - 30 + marginLR + 1, rectTopY + rectHeight - 5, 8, 5);
                            ctx.strokeRect(rectLeftX + rectWidth - 8, canvasYCenterPos - 20 - 10 + marginUD + 1, 8, 7);
                        }
                    }

                }
            }

        }
    }

    //段时间事件矩形图的上下偏移参数
    const getMarginUD = index => {
        // let { projectItems } = props.canvasParam;
        let { projectItems } = props;
        let ret = 0;

        let hisUD = [];    //结束时间与当前事件开始时间冲突的事件的各偏移参数
        for (let l = index; l >= 0; l = l - 2) {
            if (itemParam[l - 2] !== undefined) {   //说明key:l-2 对应的是段事件
                if (projectItems[index].startYear <= projectItems[l - 2].endYear) {
                    hisUD.push(itemParam[l - 2]);
                }
            }
        }

        if (hisUD.length > 0) {
            if (index % 2 === 0) {   //偶数项,在下边的
                // for (let k = 0; k > -41; k = k - 10) {
                for (let k = 0; k < 41; k = k + 10) {
                    let inFlag = false;
                    for (let t = 0; t < hisUD.length; t++) {
                        if (k === hisUD[t]) {
                            inFlag = true;
                            break;
                        }
                    }
                    if (inFlag === false) {
                        ret = k;
                        break;
                    }
                }
            } else {    //奇数项,在上边的
                // for (let k = 0; k < 41; k = k + 10) {
                for (let k = 0; k > -41; k = k - 10) {
                    let inFlag = false;
                    for (let t = 0; t < hisUD.length; t++) {
                        if (k === hisUD[t]) {
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