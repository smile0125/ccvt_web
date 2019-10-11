import React, {Component} from 'react';
import {Table, Tag, Icon, PageHeader} from 'antd';
import { groupCashBackList } from '../../redux/action/actionCreaters.jsx';
import store from '../../redux/store.jsx';
import {connect} from 'react-redux';
import {storage} from '../../assets/js/common.jsx';

class GroupManagerReward extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            group_id:'',
            limit:50,
            offset:0
        };
    }

    componentDidMount() {
        this.groupCashBackListFunc();
    }

    //获取群列表数据
    groupCashBackListFunc = (limit = this.state.limit,offset = 0) => {
        const params = {token: storage.get('token'), group_id: storage.get('group_id'), limit, offset};
        store.dispatch(groupCashBackList(params));
    };

    handleTableChange = (pagination) => {
        //console.log(pagination)//点击的哪一页
        this.groupCashBackListFunc(this.state.limit,(pagination - 1) * this.state.limit);
    };

    render() {
        const {rows, total, errcode} = this.props.data;
        const color = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple','#f50','#2db7f5','#87d068','#108ee9'];
        const columns = [
            {
                title: '数量(CCVT)',
                dataIndex: 'tx_amount',
                sorter: (a, b) => a.scale - b.scale,
                render: tx_amount => `${tx_amount}`,
                width: '13%',
            },
            {
                title: '时间',
                dataIndex: 'ctime',
                sorter: false,
                render: ctime => `${ctime}`,
                width: '13%',
            }
        ];
        return (
            <div>
                <PageHeader title="群主奖励" subTitle="群主奖励列表" />
                <Table
                    columns={columns}
                    rowKey={record => Math.random()}
                    dataSource={rows}
                    loading={ errcode ? false : true }

                    pagination={{  // 分页
                        showSizeChanger: false,//设置每页显示多少条数据
                        showQuickJumper: false,
                        showTotal: () => `共${total}条`,
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
const mapStateToProps = state => ({data: state.getGroupCashBackReducer.data});
export default connect(mapStateToProps, null)(GroupManagerReward);