import React, { Suspense } from 'react';
import Siderlayout from '@/layout/siderlayout';
import { privateRoutes } from '@/routers';
import { Switch, Route, Redirect } from 'react-router-dom';
// import HisMap from '@pages/Home/HisMap';
// import TimeLine from '@pages/Home/TimeLine';
import PageLoading from '@com/pageLoading';

export default function index(props) {

    return (
        <Siderlayout>
            <Suspense fallback={<PageLoading />}>
                <Switch>
                    {/* 需要登录后才能访问的路由都写在这里 */}
                    {privateRoutes.map(route => {
                        return <Route key={route.path} {...route} />
                    })}
                    <Redirect to="/myhis/timeline" />
                </Switch>
            </Suspense>
        </Siderlayout>
    )
}
