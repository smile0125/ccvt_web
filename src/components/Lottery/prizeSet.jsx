import React, {Component} from 'react';
import {Form, Alert, Button, Input, PageHeader, Radio} from "antd";
import { connect } from 'react-redux';
import {HandleInputChange} from '../../assets/js/handleInputChange.jsx';

class PrizeSet extends Component {
    render() {
        const { prize_name, prize_value, prize_v, prize_level, number, lottery_number } = this.props.data;
        return (
            <div>
                <PageHeader title="奖品设置" subTitle="抽奖奖品设置" />
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    <Form.Item label="奖品类型"
                               validateStatus="error"
                               help=""
                    >
                        <Radio.Group onChange={ (e) => HandleInputChange(e, 'type') } >
                            <Radio value={0}>虚拟奖品</Radio>
                            <Radio value={1}>实物奖品</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="奖品名称"
                               validateStatus={ prize_name == '' ? 'error' :'' }
                               help={ prize_name == '' ? '请输入奖品名称' :'' }
                    >
                        <Input placeholder="奖品名称" value={prize_name} onChange={ (e) => HandleInputChange(e, 'prize_name') } />
                        <Alert message="中奖的名称 如 '100CCVT' 或者 '没有中奖哦'" type="info" showIcon />
                    </Form.Item>

                    <Form.Item label="奖品数量"
                               validateStatus={ prize_value == '' ? 'error' :'' }
                               help={ prize_value == '' ? '请输入奖品数量' :'' }
                    >
                        <Input placeholder="奖品数量" value={prize_value} onChange={ (e) => HandleInputChange(e, 'prize_value') } />
                        <Alert message={`奖品的总数量 如 "500CCVT"`} type="info" showIcon />
                    </Form.Item>

                    <Form.Item label="中奖概率"
                               validateStatus={ prize_v == '' ? 'error' :'' }
                               help={ prize_v == '' ? '请输入中奖概率' :'' }
                    >
                        <Input placeholder="中奖概率" value={prize_v} onChange={ (e) => HandleInputChange(e, 'prize_v') } />
                        <Alert message={`概率设置不能小于0，概率设置越大，中奖机会越多。`} type="info" showIcon />
                    </Form.Item>

                    <Form.Item label="中奖权重"
                               validateStatus={ prize_level == '' ? 'error' :'' }
                               help={ prize_level == '' ? '请输入中奖权重' :'' }
                    >
                        <Input placeholder="中奖权重" value={prize_level} onChange={ (e) => HandleInputChange(e, 'prize_level') } />
                        <Alert message={`权重设置必须是正整数 如 1，2，3，权重越低，代表此次奖品数量越高。`} type="info" showIcon />
                    </Form.Item>
                </Form>
                <PageHeader title="其他设置" subTitle="以下设置非必填设置" />
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    <Form.Item label="总次数">
                        <Input placeholder="总次数" value={number} onChange={ (e) => HandleInputChange(e, 'number') } />
                    </Form.Item>

                    <Form.Item label="中奖次数">
                        <Input placeholder="中奖次数" value={lottery_number} onChange={ (e) => HandleInputChange(e, 'lottery_number') } />
                        <Alert message={`在一定次数内必中多少次，如 在1000次内必中10次 总次数：1000 中奖次数：10`} type="info" showIcon />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
                        <Button type="primary" onClick={this.props.prizeSetSubmit}>提交</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    data: state.inputChangeReducer
});
export default connect(mapStateToProps, null)(PrizeSet);