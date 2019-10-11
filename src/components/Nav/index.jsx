import React from 'react';
import {Layout} from 'antd';
import Content from './content.jsx'
import Header from './header.jsx'
import Sider from './sider.jsx'

const {Footer} = Layout;

const Nav = () => {

    return (
        <div>
            <Layout style={{minHeight: '100vh'}}>
                <Sider/>
                <Layout>
                    <Header/>
                    <Content/>
                    {/*<Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>*/}
                </Layout>
            </Layout>
        </div>
    );
};

export default Nav;