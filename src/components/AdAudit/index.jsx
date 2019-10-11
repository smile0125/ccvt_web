import React, {Component} from 'react';
import { Icon, PageHeader, Table, Tag, message} from "antd";
import { getAdList } from '../../redux/action/actionCreaters.jsx';
import { auditAd } from '../../http/http.jsx';
import store from '../../redux/store.jsx';
import {connect} from 'react-redux';
import {storage} from '../../assets/js/common.jsx';
import RefuseAdModal from "./refuseAdModal.jsx";
import ShowImgModal from '../../assets/js/showImgModal.jsx';

class PoolAudit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            showImgModalState:false,
            loading:true,
            currentSrc: '',
            id:'',
            limit:10,
            offset:0
        };
    }

    componentDidMount() {
        this.getAdListFunc();
    }

    edit = (id) => {
        console.log(id)
    };

    //获取群列表数据
    getAdListFunc = (limit = 10,offset = 0) => {
        const params = {token: storage.get('token'), limit, offset};
        store.dispatch(getAdList(params));
    };

    handleTableChange = (pagination) => {
        //console.log(pagination)//点击的哪一页
        this.getAdListFunc(10,(pagination - 1) * this.state.limit);
    };

    //处理广告审核
    auditAdFunc = (params) => {
        auditAd(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                message.success('处理成功');
                this.getAdListFunc();
            }else{
                message.success(`处理失败 ${ data.errmsg }`);
            }
        })
    };

    //通过
    throughAdItem = (id) => {
        const is_audit = 2;
        const params = {token: storage.get('token'), is_audit, id, why:''};
        this.auditAdFunc(params);
    };

    //拒绝审核
    refuseVoteBtn = (type) => {
        const why = this.props.refuseAdTextarea.why;
        if(type !== 'direct' && !why){
            message.error('请输入拒绝原因');
            return;
        }

        const is_audit = 3;
        const id = this.state.id;
        const token = storage.get('token');
        const params = {token, id, is_audit, why};
        this.auditAdFunc(params);
    };

    //显示拒绝弹出框
    refuse = (id) => {
        this.setState(() => ({showModal: true, id}));
    };

    //隐藏modal
    handleModalCancel = () => {
        this.setState(() => ({showModal: false}));
    };

    //显示图片
    showImg = (src) => {
        this.setState(() => ({ showImgModalState: true, currentSrc: src }));
    };

    //隐藏图片
    hideImgModal = () => {
        this.setState(() => ({ showImgModalState: false }));
    };


    render() {
        const {rows, total, errcode} = this.props.data;
        const { showImgModalState, showModal, currentSrc } = this.state;
        const color = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple','#f50','#2db7f5','#87d068','#108ee9'];
        const columns = [
            {
                title: '状态',
                dataIndex: 'is_audit',
                sorter: false,
                render: (is_audit, recode) => (is_audit == 1 && <Tag color={'lime'}>审核中</Tag>) || (is_audit == 2 && <Tag color={'green'}>通过</Tag>) || (is_audit == 3 && <div><Tag color={'red'}>拒绝</Tag><Tag color={'red'} style={{ whiteSpace: 'pre-wrap', width:'5rem'} }>原因：{ recode.why }</Tag></div>) || <Tag color={'#9e9e9e'}>失效</Tag>,
                width: '5%',
            },
            {
                title: '浏览量',
                dataIndex: 'all_browse_count',
                sorter: false,
                render: all_browse_count => `${all_browse_count}`,
                width: '7%',
            },
            {
                title: '用户量',
                dataIndex: 'all_us_browse_count',
                render: all_us_browse_count => `${all_us_browse_count}`,
                width: '7%',
            },
            {
                title: '昵称',
                dataIndex: 'wechat',
                sorter: false,
                render: wechat => `${wechat}`,
                width: '9%',
            },
            {
                title: '内容',
                dataIndex: 'content',
                sorter: false,
                render: content => `${content}`,
                width: '20%',
            },
            {
                title: '周期',
                dataIndex: 'cycle',
                sorter: false,
                render: cycle => `${cycle}天`,
                width: '9%',
            },
            {
                title: '广告费用',
                dataIndex: 'cost_amount',
                sorter: false,
                render: cost_amount => `${cost_amount}`,
                width: '9%',
            },
            {
                title: '奖励费用',
                dataIndex: 'daily_award_amount',
                sorter: false,
                render: daily_award_amount => `${daily_award_amount}`,
                width: '9%',
            },
            {
                title: '链接/图片',
                dataIndex: 'tx_content',
                sorter: false,
                render: tx_content => {
                    let type = tx_content.split('.')[tx_content.split('.').length-1];
                    if(type == 'jpeg' || type == 'png' || type == 'jpg'){
                        return <img style={{ width:'80px', height: '80px' }} src={tx_content} onClick={() => this.showImg(tx_content)} alt=""/>
                    }else{
                        return tx_content
                    }
                },
                width: '5%',
            },
            {
                title: '创建时间',
                dataIndex: 'start_time',
                sorter: false,
                render: start_time => `${start_time}`,
                width: '11%',
            },
            {
                title: '操作',
                dataIndex: 'id',
                render: (id, recode) => {
                    return (
                        recode.is_audit == 1 ? <div className='tab-edit-icon-box'>
                            <Icon className='icon' type="check-circle" onClick={()=>this.throughAdItem(`${id}`)} theme="twoTone" />
                            <Icon className='icon' type="close-circle" onClick={()=>this.refuse(`${id}`)} theme="twoTone" />
                        </div> : '已处理'
                    )
                },
                width: '10%',
                // fixed: 'right',
            }
        ];
        return (
            <div>
                <PageHeader title="广告审核" subTitle="广告审核列表" />
                { showImgModalState ? <ShowImgModal src={currentSrc} hideImgModal= {this.hideImgModal} /> : null }
                { showModal ? <RefuseAdModal handleModalCancel={this.handleModalCancel} refuseVoteBtn={this.refuseVoteBtn} /> : null }
                <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={rows}
                    scroll={{ x: 1500 }}
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
    data: state.adListReducer.data,
    refuseAdTextarea: state.inputChangeReducer,
});

export default connect(mapStateToProps, null)(PoolAudit);