import React, {Component} from 'react';
import {Button, PageHeader, Collapse, Input, Form, Row, Col, message,Switch } from "antd";
import _Upload from '../../assets/js/upload.jsx'
import OtherSwitch from './otherSwitch.jsx';
import {storage} from '../../assets/js/common.jsx';
import { editGroupListHttp } from '../../http/http.jsx';
const { Panel } = Collapse;
const { TextArea } = Input;

class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            recode:{}
        }
    }

    componentDidMount() {
        const locationParams = storage.get('groupRecode');
        const params = this.props.location.params;
        params && storage.set('groupRecode', params);
        let { recode } = this.state;
        params ? recode = params : recode = locationParams;
        this.setState({recode});
    }

    //更改输入框
    handleChange = (e, key) => {
        let { recode } = this.state;
        recode[key] = e.target.value;
        this.setState(() => ({recode}))
    };

    //获取上传后的图片
    getUploadImgSrc = (src) => {
        let { recode } = this.state;
        recode['qr_code_address'] = src;
        this.setState(() => ({recode}));
        this.editGroupListFunc();
    };

    //欢迎新人开关
    welcomeSwitchChange = (key, val) => {
        let _val = '';
        val == 1? _val = 2 : _val = 1;
        let { recode } = this.state;
        recode[key] = _val;
        this.setState(() => ({recode}));
        val == 1 ? this.editGroupListFunc() : null
    };

    //监听switch开关
    switchToggle = (key, val) => {
        let { recode } = this.state;
        recode[key] = val;
        this.setState(() => ({recode}));
        this.editGroupListFunc();
    };

    //修改群
    editGroupListFunc = () => {
        const { name, is_flirt, id, is_del, send_address, bind_account_notice, is_welcome, welcome, ranking_change_switch, qr_code_address, dis, news_switch, chat_time, leave_message_switch, random_reward_switch } = this.state.recode;
        const params = { "token": storage.get('token'), "group_name": name, "flirt": is_flirt, "group_id": id, "del": is_del, "src": qr_code_address, "group_introduction": dis, send_address, bind_account_notice, is_welcome, welcome, ranking_change_switch, news_switch, chat_time, leave_message_switch, random_reward_switch };

        editGroupListHttp(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                message.success('设置成功');
                storage.set('groupRecode', this.state.recode);
            }else{
                message.error(`设置失败 ${data.errmsg}`);
            }
        })
    };

    render() {
        const { name, dis, qr_code_address, is_del, is_flirt, send_address, bind_account_notice, is_welcome, welcome, ranking_change_switch, leave_message_switch, random_reward_switch, news_switch } = this.state.recode;
        const switchData = [
            {"title": "运行状态", "key": "is_del", "val": is_del},
            {"title": "调戏状态", "key": "is_flirt", "val": is_flirt},
            {"title": "推送当天统计", "key": "send_address", "val": send_address},
            {"title": "未绑定通知", "key": "bind_account_notice", "val": bind_account_notice},
            {"title": "荣耀积分变动通知", "key": "ranking_change_switch", "val": ranking_change_switch},
            {"title": "留言通知", "key": "leave_message_switch", "val": leave_message_switch},
            {"title": "随机奖励", "key": "random_reward_switch", "val": random_reward_switch},
            {"title": "新闻推送", "key": "news_switch", "val": news_switch},
            ];
        return (
            <div>
                <PageHeader title="编辑矿池" subTitle={name} extra={[<Button key="1" type="primary" onClick={ () => this.props.history.goBack() }>返回矿池列表</Button>]} />
                <Collapse accordion>
                    <Panel header='矿池名称' key="1">
                        <Form layout="inline">
                            <Form.Item>
                                <Input value={name} onChange={(e) => this.handleChange(e, 'name')} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={this.editGroupListFunc}>提交</Button>
                            </Form.Item>
                        </Form>
                    </Panel>
                    <Panel header="矿池介绍" key="2">
                        <Form>
                            <Form.Item>
                                <TextArea rows={4} value={dis} onChange={(e) => this.handleChange(e, 'dis')} />
                                <Button type="primary" onClick={this.editGroupListFunc}>提交</Button>
                            </Form.Item>
                        </Form>
                    </Panel>
                    <Panel header="欢迎新人" key="5">
                        <Form>
                            <Form.Item>
                                <Switch defaultChecked={ is_welcome == 1 ? true : false } onChange={ () =>this.welcomeSwitchChange('is_welcome', is_welcome) } />
                            </Form.Item>
                            { is_welcome == 1 ?
                                <Form.Item>
                                    <TextArea rows={4} value={welcome} onChange={(e) => this.handleChange(e, 'welcome')} />
                                    <Button type="primary" onClick={this.editGroupListFunc}>提交</Button>
                                </Form.Item>: null
                            }
                        </Form>
                    </Panel>
                    <Panel header="矿池二维码" key="3">
                        <Row>
                            <Col span={8}>
                                <div>
                                    <img src={qr_code_address} alt=""/>
                                    <_Upload getUploadImgSrc = {this.getUploadImgSrc} />
                                </div>
                            </Col>
                        </Row>

                    </Panel>
                    <Panel header="其他设置" key="4">
                        <OtherSwitch switchData={ switchData } switchToggle={this.switchToggle} />
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default EditGroup;