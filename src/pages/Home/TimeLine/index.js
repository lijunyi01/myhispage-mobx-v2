import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
// import { Spin, Button } from 'antd';
import timeLineState from './index.state'
import MainList from './MainList';
import MainContent from './MainContent';
import MainContentLand from './MainContentLand';
import _ from 'lodash';
import './index.less';

const Index = () => {

    const maincontentdivref = useRef(null);

    useEffect(() => {
        // useEffect 的第一个入参是个回调函数，该回调函数用到的函数最好定义在内部，否则会有告警信息
        // 如果定义在外部，要用到：// eslint-disable-line react-hooks/exhaustive-deps
        const setCanvasWidth = _.debounce(() => {
            let divdom = maincontentdivref.current;
            if (divdom) {
                timeLineState.setMainContentDivWidth(divdom.offsetWidth);
                timeLineState.setMainContentDivHeight(divdom.offsetHeight);
                //     //第一次加载会多算80px（每边24+16）
                //     if(this.isFirstLoaded) {
                //         mainContentDivWidth -= 80;
                //         this.isFirstLoaded = false;
                //     }
                //     if (mainContentDivWidth !== this.state.mainContentDivWidth) {
                //         this.setState({
                //             mainContentDivWidth: mainContentDivWidth
                //         })
                //     }
            }
        }, 200);

        window.addEventListener(
            'resize',
            // ()=>{
            //     this.setCanvasWidth()
            // },
            // 这里的处理函数不能用匿名函数，否则removeEventListener 会无效！
            setCanvasWidth,
            false
        );
        setCanvasWidth();
        // 如果 effect 返回一个函数，React 将会在执行清除操作时调用它；返回的可以是匿名函数
        return function cleanup() {
            window.removeEventListener(
                'resize',
                setCanvasWidth,
                false
            );
        };
    }, []);

    return (
        <div id="wrap">
            <div id="spindiv">
                {/* {props.timeLineState.shouldShowSpin ? <Spin /> : <></>} */}
            </div>
            <div className="mainlist">
                <MainList />
            </div>
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
