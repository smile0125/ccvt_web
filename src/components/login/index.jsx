import React, {Component} from 'react';
import bg from '../../assets/img/bg.png';
import {Input, Button} from 'antd';
import hex_sha1 from '../../assets/js/sha.jsx';
import store from '../../redux/store.jsx';
import {login} from '../../redux/action/actionCreaters.jsx';
import '../../assets/scss/login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            password:''
        }
    }

    handleChange = (key,e) => {
        let val = e.target.value;
        this.setState(() => ({ [key]: val}));
    };

    handleClick = () => {
        const {user, password} = this.state;
        const pass_word_hash = hex_sha1(password);
        const params = {user, pass_word_hash};
        store.dispatch(login(params));
    };

    render() {
        return (
            <div className='login-container' style={{backgroundImage: `url(${bg})`}}>
                <div className='login-title-box'>
                    <h1 className='login-title'>AI后台管理系统</h1>
                    <div className='login-input-box'>
                        <Input className='input' placeholder="账号" allowClear onChange={(e) => this.handleChange('user',e)}/>
                        <Input.Password className='input' placeholder="密码" onChange={(e) => this.handleChange('password',e)}/>
                    </div>
                    <div className='login-button-box'>
                        <Button type="primary" onClick={this.handleClick}>登录</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;