import React from 'react'
import { Button } from 'antd';
import { removeToken } from '@utils/auth';

export default function index(props) {
    const handleLogOutClick = () => {
        removeToken();
        props.history.push('/login');
    };
    return (
        <div>
            <h1>Home</h1>
            <Button type="primary" onClick={handleLogOutClick} >
                LogOut
            </Button>
        </div>
    )
}
