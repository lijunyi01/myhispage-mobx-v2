import React from 'react';
import { withRouter } from 'react-router-dom';
import TimeLineHeader from './TimeLineHeader';
import MapHeader from './MapHeader';
import RulerHeader from './RulerHeader';

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
