import React, {Component} from 'react';
import { PageHeader, Table } from 'antd';
import store from '../../redux/store.jsx';
import {connect} from 'react-redux';
import {storage} from '../../assets/js/common.jsx';
import { getAssistOn } from '../../redux/action/actionCreaters.jsx';

class AssistOnClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            limit:100,
            offset:0
        };
    }

    componentDidMount() {
        this.getAssistOnFunc();
    }

    //获取群列表数据
    getAssistOnFunc = (limit = this.state.limit, offset = 0) => {
        const params = {token: storage.get('token'), limit, offset};
        store.dispatch(getAssistOn(params));
    };

    handleTableChange = (pagination) => {
        //console.log(pagination)//点击的哪一页
        this.getAssistOnFunc(this.state.limit,(pagination - 1) * this.state.limit);
    };

    render() {
        const {rows, total, errcode} = this.props.data;
        const color = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple','#f50','#2db7f5','#87d068','#108ee9'];
        const columns = [

            {
                title: '发起人',
                dataIndex: 'give_account',
                sorter: false,
                render: give_account => `${give_account}`,
                width: '20%',
            },
            {
                title: '接受人',
                dataIndex: 'receive_account',
                render: receive_account => `${receive_account}`,
                width: '20%',
            },
            {
                title: '数量(CCVT)',
                dataIndex: 'tx_amount',
                render: tx_amount => `${tx_amount}`,
                width: '20%',
            },{
                title: '类型',
                dataIndex: 'tx_detail',
                render: tx_detail => `${tx_detail}`,
                width: '20%',
            },
            {
                title: '时间',
                dataIndex: 'utime',
                render: utime => `${utime}`,
                width: '20%',
            }
        ];
        return (
            <div>
                <PageHeader title="赞踩记录" subTitle="赞踩记录列表"/>
                <Table
                    columns={columns}
                    rowKey={record => record.hash_id}
                    dataSource={rows}
                    loading={ errcode ? false : true }

                    pagination={{  // 分页
                        showSizeChanger: false,//设置每页显示多少条数据
                        showQuickJumper: false,
                        showTotal: () => `共${Number(total)}条`,
                        pageSize: this.state.limit,
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
const mapStateToProps = state => ({data: state.assistOnReducer.data});
export default connect(mapStateToProps, null)(AssistOnClass);