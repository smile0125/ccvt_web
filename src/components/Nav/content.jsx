import React from 'react';
import {HashRouter, Switch, Route, withRouter} from 'react-router-dom';
import {Layout, Breadcrumb} from 'antd';
import Routers from '../../router.jsx';

const {Content} = Layout;
const ContentCLass = () => {
    return (
        <Content style={{margin: '0 16px'}} className='custom-content'>
            <Breadcrumb style={{padding: '16px 0'}}>
                {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
            </Breadcrumb>
            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                <HashRouter>
                    <Switch>
                        {
                            Routers.map(({ path, component, id, exact = true }) => {
                                return ( <Route exact={exact} path={path} component={component} key={id} /> )
                            })
                        }
                    </Switch>
                </HashRouter>
            </div>
        </Content>
    );
};

export default withRouter(ContentCLass);