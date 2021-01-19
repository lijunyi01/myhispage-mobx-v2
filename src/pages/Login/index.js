import React from 'react'
import {
    Form,
    Input,
    Button,
    Checkbox,
    Card
} from 'antd';
import {
    UserOutlined,
    LockOutlined
} from '@ant-design/icons';
import './index.css';
import { setToken } from '@utils/auth';

function index(props) {
    // console.log(props);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setToken('token111');
        if (props.history.location.state) {
            // console.log("go to:" + props.history.location.state.from.pathname);
            props.history.push(props.history.location.state.from.pathname);
        } else {
            props.history.push('/myhis');
        }
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
                    Or <a href="foo">register now!</a>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default index