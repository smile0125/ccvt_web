import React from 'react';
import {Layout, Menu} from 'antd';
import {storage} from '../../assets/js/common.jsx';

const {Header} = Layout;

const HeaderClass = () => {
    const logout = () => {
        storage.clear();
        window.location.hash='/login';
    };
    return (
        <Header className='custom-top-nav'>
            <Menu
                className='top-nav'
                theme="dark"
                mode="horizontal"
                style={{lineHeight: '64px'}}
            >
                <Menu.Item key="1" className='logout' onClick={logout}>退出</Menu.Item>
            </Menu>
        </Header>
    );
}

export default HeaderClass;