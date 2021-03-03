import React from 'react';
import { withRouter } from 'react-router-dom';
import TimeLineHeader from './timeLineHeader';
import MapHeader from './mapHeader';
import RulerHeader from './rulerHeader';

function Index(props) {

    switch (props.location.pathname) {
        case "/myhis/timeline":
            return <TimeLineHeader />;
        case "/myhis/map":
            return <MapHeader />;
        case "/myhis/refruler":
            return <RulerHeader />;
        default:
            return <div>default</div>

    }
}

export default withRouter(Index);
