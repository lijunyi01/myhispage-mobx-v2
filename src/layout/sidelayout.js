import React from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import './sidelayout.css';
import { Link, withRouter } from "react-router-dom";
import { removeToken } from '@utils/auth';

const { Header, Sider, Content } = Layout;

@withRouter
class SiderLayout extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleLogout = () => {
        removeToken();
        this.props.history.push('/login');
    }

    render() {
        return (
            <Layout id="sidelayout">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/myhis/timeline" />
                            TimeLine
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <Link to="/myhis/map" />
                            Map
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            nav 3
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UploadOutlined />} className="last-menu" onClick={this.handleLogout}>
                            Logout
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default SiderLayout;