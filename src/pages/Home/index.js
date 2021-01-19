import React from 'react';
import Sidelayout from '@/layout/sidelayout';
import { privateRoutes } from '@/routers';
import { Switch, Route, Redirect } from 'react-router-dom';
// import HisMap from '@pages/Home/HisMap';
// import TimeLine from '@pages/Home/TimeLine';

export default function index(props) {

    return (
        <Sidelayout>
            <Switch>
                {privateRoutes.map(route => {
                    return <Route key={route.path} {...route} />
                })}
                <Redirect to="/myhis/timeline" />
            </Switch>
        </Sidelayout>
    )
}
