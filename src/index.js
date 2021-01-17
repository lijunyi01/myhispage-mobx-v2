import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "mobx-react";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { HashRouter } from "react-router-dom";
import rootState from './index.state';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider {...rootState}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>   
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
