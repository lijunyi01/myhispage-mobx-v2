import React from 'react'
import {
    Form,
    Input,
    Button,
    Checkbox,
    Card,
    Modal
} from 'antd';
import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons';
import './index.css';
import { setToken, setUmid } from '@utils/auth';
import server from './index.server';
import _ from 'lodash';

const {
    login,       // 登录接口对应的函数
} = server;

function index(props) {
    // console.log(props);

    const handleNotAuthorized = _.throttle((message) => {
        Modal.warn({
            title: "提示",
            content: message,
            onOk() {
                // 重定向至登录页面
                // removeToken();
                // redirectToLogin();
            }
        });
    }, 500);

    const onFinish = (values) => {
        // console.log('Received values of form: ', values);
        const param = {
            loginName: values.username,
            loginPwd: values.password,
            platform: "web"
        }
        login(param).then(res => {
            console.log("login-res:", res)
            if (res.status === 0) {
                setToken(res.token)
                setUmid(res.umid)
                if (props.history.location.state) {
                    // console.log("go to:" + props.history.location.state.from.pathname);
                    props.history.push(props.history.location.state.from.pathname);
                } else {
                    props.history.push('/myhis');
                }
            } else {
                handleNotAuthorized(res.messageCode);
            }
        }).catch(err => {
            console.log("catch " + err); // catch error
        });
    };

    return (
        <Card title="Myhis App" className="login-form">
            <Form
                name="normal_login"
                // className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="foo">
                        Forgot password
                </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Login
                    </Button>
                    Or <a href="regist">regist now!</a>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default index