import React, {Component} from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store.jsx';
import './http/config.jsx';
import './assets/scss/common.scss';
import AsyncComponent from './components/AsyncComponent/index.jsx';

const routerArr = [
    {
        id: "login",
        path: '/login',
        component: AsyncComponent(() => import(/* webpackChunkName: "login" */'./components/login/index.jsx'))
    },
    {
        id: "nav",
        path: '/:item/:num',
        component: AsyncComponent(() => import(/* webpackChunkName: "nav" */'./components/Nav/index.jsx'))
    }
];

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        {
                            routerArr.map(({ path, component, id, exact = true }) => {
                                return ( <Route exact={exact} path={path} component={component} key={id} /> )
                            })
                        }
                        <Redirect to='/login' />
                    </Switch>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;