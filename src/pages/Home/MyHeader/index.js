import React from 'react';
import { withRouter } from 'react-router-dom';
import TimeLineHeader from './TimeLineHeader';
import MapHeader from './MapHeader';

function Index(props) {

    switch (props.location.pathname) {
        case "/myhis/timeline":
            return <TimeLineHeader />;
        case "/myhis/map":
            return <MapHeader />;
        default:
            return <div>default</div>

    }
}

export default withRouter(Index);
