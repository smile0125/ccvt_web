import React, {Component} from 'react';
import {withRouter,Link} from "react-router-dom";
import {Layout, Menu, Icon} from 'antd';
import logo from '../../assets/img/logo.png';

const { SubMenu } = Menu;
const {Sider} = Layout;

class SiderClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultSelectedKeys: '1',
            collapsed: false,
            navArr: [
                {id: 1, path: '/group/1', name: '矿池列表', icon: 'pie-chart'},
                {id: 2, path: '/task/2', name: '定时任务', icon: 'notification'},
                // {id: 3, path: '/group', name: '奖励统计'},
                {id: 4, path: '/assist/4', name: '赞踩记录', icon: 'profile'},
                {id: 5, path: '/key/5', name: '关键字', icon: 'security-scan'},
                {id: 6, path: '/code/6', name: '兑换码', icon: 'radius-setting'},
                {id: 7, path: '/lottery/7', name: '抽奖设置', icon: 'setting'},
                {id: 8, path: '/cycle/8', name: '周期奖励', icon: 'unordered-list'},
                {
                    subId: 's1', subName: '审核', icon: 'edit', sub: [
                        // {id: 9, path: '/pool/9', name: '矿池审核'},
                        {id: 10, path: '/ad/10', name: '广告审核'},
                        {id: 11, path: '/vote/11', name: '投票审核'},
                    ]
                }
            ]
        }
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };

    render() {
        const { navArr } = this.state;
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} className='custom-left-nav'>
                <div className="logo" style={{backgroundImage:`url(${logo})`}}/>
                <Menu theme="dark" defaultSelectedKeys={[this.props.location.pathname.split('/')[2]]} mode="inline">
                    {
                        navArr.map((item, index) => {
                            return (
                                !item.subId ?
                                    <Menu.Item key={item.id}>
                                        <Icon type={item.icon}/>
                                        <Link to={ item.path } className='slide-menu-navLink'>{item.name}</Link>
                                    </Menu.Item> :
                                    <SubMenu key={item.subId}
                                             title={<span>
                                                 <Icon type={item.icon}/>
                                                 <span>{item.subName}</span></span>}>
                                        {
                                            item.sub.map((sub, i) => {
                                                return (
                                                    <Menu.Item key={sub.id}>
                                                        <Link to={sub.path}
                                                                 className='slide-menu-navLink'>{sub.name}</Link>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                            )
                        })
                    }
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(SiderClass);