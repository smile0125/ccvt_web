import React, {Component} from 'react';
import {Table, Icon, Button, message, Tag, PageHeader, Select} from 'antd';
import { voteAudit } from '../../redux/action/actionCreaters.jsx';
import {submitVoteAuditHttp} from '../../http/http.jsx';
import store from '../../redux/store.jsx';
import {connect} from 'react-redux';
import {storage} from '../../assets/js/common.jsx';
import VoteRefuseModal from './voteRefuseModal.jsx';
const { Option } = Select;

class VoteAudit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            showModal: false,
            vote_id: '',
            limit:10,
            offset:0
        };
    }

    componentDidMount() {
        this.voteAuditFunc();
    }

    //通过审核
    through = (id) => {
        const is_audit = 2;
        const why = "";
        const vote_id = id;
        const token = storage.get('token');
        const params = {token, vote_id, is_audit, why};
        this.submitVoteAuditFunc(params);
    };

    //拒绝审核
    refuseVoteBtn = (type) => {
        const why = this.props.refuseVoteTextarea.refuseVoteTextarea;
        if(type !== 'direct' && !why){
            message.error('请输入拒绝原因');
            return;
        }

        const is_audit = 3;
        const vote_id = this.state.vote_id;
        const token = storage.get('token');
        const params = {token, vote_id, is_audit, why};
        this.submitVoteAuditFunc(params);
    };

    //显示拒绝弹出框
    refuse = (vote_id) => {
        this.setState(() => ({showModal: true, vote_id}));
    };

    //隐藏modal
    handleModalCancel = () => {
        this.setState(() => ({showModal: false}));
    };

    //提交审核
    submitVoteAuditFunc = (params) => {
        submitVoteAuditHttp(params).then(res => {
            if(res.data.errcode == 0){
                message.success('处理成功');
                this.setState(() => ({showModal: false}));
                this.voteAuditFunc();
            }else{
                message.success('处理失败');
            }
        })
    };

    //获取列表数据
    voteAuditFunc = (limit = 10, offset = 0, is_audit = 0) => {
        const params = {token: storage.get('token'), limit, offset, is_audit};
        // console.log(params)
        store.dispatch(voteAudit(params));
    };

    //筛选
    handleChange = (val) => {
        this.voteAuditFunc(10, 0, val);
    };

    handleTableChange = (pagination) => {
        //console.log(pagination)//点击的哪一页
        this.voteAuditFunc(10,(pagination - 1) * this.state.limit, 0);
    };

    render() {
        const {rows, total, errcode} = this.props.data;
        const color = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple','#f50','#2db7f5','#87d068','#108ee9'];
        const columns = [
            {
                title: '状态',
                dataIndex: 'is_audit',
                sorter: false,
                render: is_audit => (is_audit == 1 && <Tag color={'lime'}>审核中</Tag>) || (is_audit == 2 && <Tag color={'green'}>通过</Tag>) || <Tag color={'red'}>拒绝</Tag>,
                width: '10%',
            },
            {
                title: '发起人',
                dataIndex: 'wechat',
                sorter: false,
                render: wechat => `${wechat}`,
                width: '20%',
            },
            {
                title: '提名',
                dataIndex: 'name',
                render: name => `${name}`,
                width: '15%',
            },
            {
                title: '链接',
                dataIndex: 'url',
                render: url => <a href={url} target="_blank">百度百科</a>,
                width: '15%',
            },
            {
                title: '时间',
                dataIndex: 'ctime',
                render: ctime => `${ctime}`,
                width: '20%',
            },
            {
                title: '操作',
                dataIndex: 'id',
                render: (id, recode) => {
                    if(recode.is_audit == 1){
                        return(
                            <div className='tab-edit-icon-box'>
                                <Icon className='icon' type="check-circle" onClick={()=>this.through(`${id}`)} theme="twoTone" />
                                <Icon className='icon' type="close-circle" onClick={()=>this.refuse(`${id}`)} theme="twoTone" />
                            </div>
                        )
                    }else if(recode.is_audit ==2){
                            return( <div><Tag color={'green'}>票数：{recode.send_amount}</Tag><Tag color={'magenta'}>投票次数：{recode.all_count}</Tag></div> )
                    }else {
                        return ( <Tag style={{whiteSpace: 'pre-wrap'}} color={'red'}>已拒绝 {recode.why}</Tag> )
                    }
                },
                width: '20%',
            }
        ];
        return (
            <div>
                <PageHeader title="投票审核" subTitle="投票审核列表"
                extra={[
                    <Select key="1" defaultValue="0" style={{ width: 120 }} onChange={this.handleChange}>
                        <Option value="0">全部</Option>
                        <Option value="1">审核中</Option>
                        <Option value="2">通过</Option>
                        <Option value="3">拒绝</Option>
                    </Select>
                ]}
                />
                { this.state.showModal ? <VoteRefuseModal handleModalCancel={this.handleModalCancel} refuseVoteBtn={this.refuseVoteBtn} /> : null }

                <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={rows}
                    loading={ errcode ? false : true }

                    pagination={{  // 分页
                        showSizeChanger: false,//设置每页显示多少条数据
                        showQuickJumper: false,
                        showTotal: () => `共${total}条`,
                        pageSize: this.state.pageSize,
                        // current: page.pageNum,
                        total: total,
                        // onShowSizeChange: (current,pageSize) => this.changePageSize(pageSize,current),
                        onChange: (current) => this.handleTableChange(current)
                    }}
                />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    data: state.voteAuditReducer.data,
    refuseVoteTextarea: state.inputChangeReducer,
});
export default connect(mapStateToProps, null)(VoteAudit);