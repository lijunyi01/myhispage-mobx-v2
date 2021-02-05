import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { Provider } from "mobx-react";
// import { ConfigProvider } from 'antd';
// import zhCN from 'antd/es/locale/zh_CN';
import { BrowserRouter } from "react-router-dom";
// import rootState from './index.state';

ReactDOM.render(
  // <React.StrictMode> 在标签范围内执行严格模式检查，可以作用在任意范围，不影响生产包
  <React.StrictMode>
    {/*  <ConfigProvider locale={zhCN}> 放到App.js去，保持index.js 的单纯 */}
    {/* <ConfigProvider locale={zhCN}> */}
    {/* 不需要用Provider， 它的功能是将state从顶层注入各组件的props，如非必要不要使用；mobx支持分布式state！*/}
    {/* <Provider {...rootState}> */}
    <BrowserRouter>
      <App />
    </ BrowserRouter>,
   {/* </Provider>    */}
    {/* </ConfigProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </ BrowserRouter>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
