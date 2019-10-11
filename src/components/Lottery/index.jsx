import React, {Component} from 'react';
import { PageHeader, Form, Input, Alert, Button, Radio, message } from 'antd';
import { connect } from 'react-redux';
import {storage} from "../../assets/js/common.jsx";
import store from '../../redux/store.jsx';
import { getLotteryRules } from '../../redux/action/actionCreaters.jsx';
import { setLotteryRulesHttp, prizeSetHttp } from '../../http/http.jsx';
import {HandleInputChange} from '../../assets/js/handleInputChange.jsx';
import PrizeSet from './prizeSet.jsx';

class Lottery extends Component {

    componentDidMount() {
        this.getLotteryRulesFunc();
    }

    //获取抽奖规则
    getLotteryRulesFunc = () => {
        const params = {token: storage.get('token')};
        store.dispatch(getLotteryRules(params))
    };

    //设置抽奖规则
    rulesSubmit = () => {
        const { prize_free_number, prize_amount } = this.props.data;
        const token = storage.get('token');
        const params = {token, prize_free_number, prize_amount};
        setLotteryRulesHttp(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                message.success('设置成功');
                this.getLotteryRulesFunc();
            }else{
                message.success(`设置失败 ${data.errmsg}`);
            }
        })
    };

    //奖品中奖概率设置
    prizeSetSubmit = () => {
        const token = storage.get('token');
        const { type, prize_name, prize_value, prize_v, prize_level, number, lottery_number } = this.props.data;
        if(type !== 0 && type !== 1){ message.error('请选择正确的奖品类型'); return; }
        if(!prize_name){ message.error('请输入奖品名称'); return; }
        if(!prize_value){ message.error('请输入奖品数量'); return; }
        if(!prize_v){ message.error('请输入中奖概率'); return; }
        if(!prize_level){ message.error('请输入中奖权重'); return; }
        const params = { token, type, prize_name, prize_value, prize_v, prize_level, number, lottery_number };
        prizeSetHttp(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                message.success('设置成功');
            }else{
                message.error(`设置失败 ${data.errmsg}`);
            }
        })
    };

    //跳转
    jump = (pathname) => {
        //前往奖品列表
        this.props.history.push({pathname});
    };

    render() {
        const { prize_free_number, prize_amount } = this.props.data;
        return (
            <div>
                {/*抽奖规则设置*/}
                <PageHeader title="规则设置" subTitle="抽奖规则设置" extra={[
                    <Button key="1" type="primary" onClick={ () => this.jump('/prize/7') }>奖品列表</Button>,
                    <Button key="2" onClick={ () => this.jump('/drawRecord/7') }>抽奖记录</Button>,
                ]} />
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    <Form.Item label="免费次数">
                        <Input value={prize_free_number} onChange={ (e) => HandleInputChange(e, 'prize_free_number') } placeholder="免费次数" />
                    </Form.Item>
                    <Form.Item label="消耗金额">
                        <Input placeholder="消耗金额" value={prize_amount} onChange={ (e) => HandleInputChange(e, 'prize_amount') } />
                        <Alert message="没有免费次数时花费的金额" type="info" showIcon />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24, offset: 4 }}>
                        <Button type="primary" onClick={this.rulesSubmit}>提交</Button>
                    </Form.Item>
                </Form>

                {/*奖品设置*/}
                <PrizeSet prizeSetSubmit={this.prizeSetSubmit} />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    data: state.inputChangeReducer
});
export default connect(mapStateToProps)(Lottery);