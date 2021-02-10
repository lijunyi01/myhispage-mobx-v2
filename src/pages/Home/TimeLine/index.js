import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
// import { Spin, Button } from 'antd';
import timeLineState from './index.state'
import MainList from './MainList';
import MainContent from './MainContent';
import MainContentLand from './MainContentLand';
import _ from 'lodash';
import './index.less';
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';

const Index = () => {

    const maincontentdivref = useRef(null);

    useEffect(() => {
        // useEffect 的第一个入参是个回调函数，该回调函数用到的函数最好定义在内部，否则会有告警信息
        // 如果定义在外部，要用到：// eslint-disable-line react-hooks/exhaustive-deps
        const setCanvasSize = _.debounce(() => {
            let divdom = maincontentdivref.current;
            if (divdom) {
                // console.log("divdom1", divdom);
                // console.log("divdomWidth1:", divdom.offsetWidth);
                timeLineState.setMainContentDivWidth(divdom.offsetWidth);
                timeLineState.setMainContentDivHeight(divdom.offsetHeight);
            }
        }, 200);

        window.addEventListener(
            'resize',
            // ()=>{
            //     this.setCanvasWidth()
            // },
            // 这里的处理函数不能用匿名函数，否则removeEventListener 会无效！
            setCanvasSize,
            false
        );
        setCanvasSize();
        // 如果 effect 返回一个函数，React 将会在执行清除操作时调用它；返回的可以是匿名函数
        return function cleanup() {
            window.removeEventListener(
                'resize',
                setCanvasSize,
                false
            );
        };
    }, []);

    useEffect(() => {
        // 必须用_.debounce 或 setTimeOut,延迟调用。因为菜单收缩伸展有时间，点击按钮后立即取尺寸会取到过程中的尺寸而非最终尺寸
        const setCanvasSize = _.debounce(() => {
            let divdom = maincontentdivref.current;
            if (divdom) {
                timeLineState.setMainContentDivWidth(divdom.offsetWidth);
                // console.log("divdom", divdom);
                // console.log("divdomWidth:", divdom.offsetWidth);
            }
        }, 600);

        setCanvasSize();

    }, [timeLineState.mainListModelFlag, timeLineState.layoutMenuModelFlag]);  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id="wrap">

            { timeLineState.mainListModelFlag ?
                <div className="mainlist">
                    <MainList />
                </div>
                :
                <div className="mainlist-none">
                    <MainList />
                </div>
            }
            { timeLineState.mainListModelFlag ?
                <div id="icondiv" style={{ 'left': '250px' }} onClick={() => { timeLineState.toogleMainListModelFlag() }}>
                    <MenuFoldOutlined />
                </div>
                :
                <div id="icondiv" style={{ 'left': '10px' }} onClick={() => { timeLineState.toogleMainListModelFlag() }}>
                    <MenuUnfoldOutlined />
                </div>
            }
            <div ref={maincontentdivref} id="maincontent">
                {/* mobx6.0 ，timeLineState 被引入就会被观察，而不用显式注入组件，很方便 */}
                {timeLineState.mainContentModelFlag ?
                    <MainContentLand mainContentDivWidth={timeLineState.mainContentDivWidth} mainContentDivHeight={timeLineState.mainContentDivHeight} />
                    :
                    <MainContent mainContentDivWidth={timeLineState.mainContentDivWidth} mainContentDivHeight={timeLineState.mainContentDivHeight} />
                }
            </div>
        </div>
    )
}

export default observer(Index);
