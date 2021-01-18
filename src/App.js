// import logo from './logo.svg';
import './App.css';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';
import { Switch, Route, Redirect } from 'react-router-dom';
// moment包被其它组件依赖，已存在于node_modules，不用另外安装
import moment from "moment";
import { isLogined } from '@utils/auth';
import { publicRoutes } from './routers';
import Home from '@pages/Home';


moment.locale("zh-cn");

const PrivateRoute = ({ component: Component, location: Location, ...rest }) => {
  if (isLogined()) {
    // if (!appState.getUserInfo()) {
    //   appState.getUserInfo();
    // }
    return (
      <Route {...rest} render={props => <Component {...props} />} />
    );
  } else {
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: Location }
      }} />
    );
  }
};

function App(props) {
  return (
    <ConfigProvider locale={zhCN}>
      <Switch>
        {publicRoutes.map(route => {
          return <Route key={route.path} {...route} />
        })}
        <PrivateRoute path="/myhis" component={Home} location={props.location} />
        <Redirect to="/myhis" from="/" />
        <Redirect to="/404" />
      </Switch>

    </ConfigProvider>
  );
}

export default App;
