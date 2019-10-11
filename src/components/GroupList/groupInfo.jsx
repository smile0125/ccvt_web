import React, {Component} from 'react';
import {Button, PageHeader, Card, Col, Row, Progress, Alert, Tag} from "antd";
import {storage} from "../../assets/js/common.jsx";
import { getGroupInfo } from '../../redux/action/actionCreaters.jsx';
import store from '../../redux/store.jsx';
import {connect} from 'react-redux';
import GroupManagerReward from './groupManagerReward.jsx';
import '../../assets/scss/group.scss';

class GroupInfo extends Component {
    constructor(props) {
        super(props);
        this.state={ group_id:'', row:'' }
    }

    componentDidMount() {
        const locationParams = storage.get('group_id');
        const params = this.props.location.params;
        params && storage.set('group_id', params.group_id);
        let { group_id } = this.state;
        params ? group_id = params.group_id : group_id = locationParams;
        this.setState(() => ({group_id}), () => this.getGroupInfoFunc());
    }

    //获取群详情
    getGroupInfoFunc = () => {
        const params = {token: storage.get('token'), group_id: this.state.group_id};
        store.dispatch(getGroupInfo(params))
    };

    render() {
        const { is_show } = this.props.data;
        return (
            <div>
                {
                    is_show ?
                        <div>
                            <PageHeader title={ this.props.data.data.row.name } subTitle='矿池详情' extra={[<Button key="1" type="primary" onClick={ () => this.props.history.goBack() }>返回矿池列表</Button>]} />
                            <Row>
                                <Col span={20}>
                                    <div className='flex'>
                                        <h3>荣耀等级：</h3>
                                        <div className='flex' style={{margin:'0 0.5rem'}}>
                                            <Tag color="magenta">LV.{this.props.data.data.row.scale}</Tag>
                                            <Progress percent={ (parseInt(this.props.data.data.row.bind_count) + parseInt(this.props.data.data.row.group_member_number)) / (parseInt(this.props.data.data.row.next_level_bind_number) + this.props.data.data.row.next_level_glory_number) * 100 } status="active" className='progress' style={{width:'12rem', margin:'0 0.5rem'}} showInfo={false} />
                                            <Tag color="green">LV.{parseInt(this.props.data.data.row.scale) + 1}</Tag>
                                        </div>
                                        <Alert message={` 距离下一级还需${ (parseInt(this.props.data.data.row.next_level_bind_number) - parseInt(this.props.data.data.row.bind_count)) > 0 ? (parseInt(this.props.data.data.row.next_level_bind_number) - parseInt(this.props.data.data.row.bind_count)) : 0 }绑定用户和${ (parseInt(this.props.data.data.row.next_level_glory_number) - parseInt(this.props.data.data.row.glory_number)) > 0 ? (parseInt(this.props.data.data.row.next_level_glory_number) - parseInt(this.props.data.data.row.glory_number)) : 0 }颗荣耀星数 `} type="info" />
                                    </div>
                                </Col>
                            </Row>
                            <div className='flex' style={{marginBottom:'1rem'}}>
                                <h3>管理员：</h3>
                                { this.props.data.data.row.group_lord }
                            </div>

                            <div style={{ background: '#fafafa', padding: '30px',marginBottom:'1rem' }}>
                                <Row gutter={16} className='group-info-item'>
                                    <Col span={6}>
                                        <Card title="矿池人数" bordered={false}>
                                            { this.props.data.data.row.group_member_number }
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card title="绑定人数" bordered={false}>
                                            { this.props.data.data.row.bind_count }
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card title="新增人数" bordered={false}>
                                            { this.props.data.data.row.this_day_in }
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card title="荣耀星数" bordered={false}>
                                            { this.props.data.data.row.glory_number }
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                            <div className='flex' style={{marginBottom:'1rem'}}>
                                <h3>矿池介绍：</h3>
                                { this.props.data.data.row.dis }
                            </div>
                            <div className='flex' style={{marginBottom:'1rem'}}>
                                <h3>入群二维码：</h3>
                                {
                                    this.props.data.data.row.qr_code_address ?
                                        <img style={{width:'10rem'}} src={ this.props.data.data.row.qr_code_address } alt=""/>
                                        : '无'
                                }

                            </div>
                        </div>
                        : null
                }
                <GroupManagerReward/>
            </div>
        );
    }
}
const mapStateToProps = state => ({ data: state.getGroupInfoReducer });
export default connect(mapStateToProps, null)(GroupInfo);