import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Spin, Button } from 'antd';
import timeLineState from './index.state'
import { MainList, MainContent } from './components';
import './index.less';

const Index = (props) => {

    // useEffect(() => {
    //     state.changetest();
    // }, [])

    return (
        <div id="wrap">
            <div id="spindiv">
                {/* {props.timeLineState.shouldShowSpin ? <Spin /> : <></>} */}
            </div>
            <div className="mainlist">
                <MainList />
            </div>
            <div id="maincontent">
                <MainContent mainContentDivWidth={300} />
            </div>
        </div>
    )
}

export default observer(Index);
