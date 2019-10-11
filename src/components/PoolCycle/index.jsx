import React, {Component} from 'react';
import {Button, Icon, PageHeader, Select, Table, Tag} from "antd";
import { getPoolCycleList, selectPoolCycleList } from '../../redux/action/actionCreaters.jsx';
import store from '../../redux/store.jsx';
import {connect} from 'react-redux';
import {storage} from '../../assets/js/common.jsx';
const { Option } = Select;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            unlock_id: '',
            limit:200,
            offset:0
        };
    }
    componentDidMount() {
        this.getPoolCycleListFunc();
        this.selectPoolCycleListFunc();
    }
    //获取群列表数据
    getPoolCycleListFunc = (limit = this.state.limit, offset = 0, unlock_id = this.state.unlock_id) => {
        const params = {token: storage.get('token'), limit, offset, unlock_id};
        store.dispatch(getPoolCycleList(params));
    };

    //获取筛选周期项
    selectPoolCycleListFunc = () => {
        const params = { token: storage.get('token') };
        store.dispatch(selectPoolCycleList(params));
    };

    //筛选
    selectPoolChange = (val) => {
        this.setState(() => ({unlock_id: val}), () => this.getPoolCycleListFunc());
    };

    handleTableChange = (pagination) => {
        //console.log(pagination)//点击的哪一页
        this.getPoolCycleListFunc(this.state.limit,(pagination - 1) * this.state.limit, this.state.unlock_id);
    };
    render() {
        const {rows, total, errcode} = this.props.data;
        const { rows: selectList } = this.props.selectPoolList;
        console.log(selectList);
        const color = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple','#f50','#2db7f5','#87d068','#108ee9'];
        const columns = [
            {
                title: '等级',
                dataIndex: 'group_scale',
                sorter: (a, b) => a.group_scale - b.group_scale,
                render: group_scale => <Tag color={color[group_scale-1]}>{group_scale}</Tag>,
                width: '10%',
            },
            {
                title: '名称',
                dataIndex: 'group_name',
                sorter: false,
                render: group_name => `${group_name}`,
                width: '10%',
            },
            {
                title: '人数',
                dataIndex: 'group_member_num',
                sorter: (a, b) => a.group_member_num - b.group_member_num,
                render: group_member_num => `${group_member_num}`,
                width: '10%',
            },
            {
                title: '绑定人数',
                dataIndex: 'group_bind_num',
                sorter: (a, b) => a.group_bind_num - b.group_bind_num,
                render: group_bind_num => `${group_bind_num ? group_bind_num : '--'}`,
                width: '10%',
            },
            {
                title: '周期收益',
                dataIndex: 'cycle_income',
                sorter: (a, b) => a.cycle_income - b.cycle_income,
                render: cycle_income => `${cycle_income}`,
                width: '10%',
            },
            {
                title: '矿主收益',
                dataIndex: 'owner_income',
                render: owner_income => `${owner_income}`,
                sorter: (a, b) => a.owner_income - b.owner_income,
                width: '10%',
            },
            {
                title: '矿主',
                dataIndex: 'owner_wechat',
                render: owner_wechat => `${owner_wechat}`,
                width: '10%',
            },
            {
                title: '邀请人',
                dataIndex: 'owner_inviter_wechat',
                render: owner_inviter_wechat => `${owner_inviter_wechat}`,
                width: '15%',
            },
            {
                title: '邀请人奖励',
                dataIndex: 'tx_amount',
                sorter: (a, b) => a.tx_amount - b.tx_amount,
                render: tx_amount => `${tx_amount}`,
                width: '15%',
            }
        ];
        return (
            <div>
                <PageHeader title="周期奖励" subTitle="矿池周期奖励" extra={[
                    <Select key="1" defaultValue="选择周期" style={{ width: 300 }} onChange={ this.selectPoolChange } disabled={ selectList ? false : true }>
                        {
                            selectList ? selectList.map((item, index) => {
                                return (<Option value={item.cycle} key={item.id}>第{ item.cycle }周期 { item.start } ~ { item.end }</Option>)
                            }) : null
                        }
                    </Select>
                ]} />
                <Table
                    columns={columns}
                    rowKey={record => record.id}
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
const mapStateToProps = state => ({
    data: state.getPoolCycleListReducer.data,
    selectPoolList: state.selectPoolCycleListReducer.data
});
export default connect(mapStateToProps, null)(Index);