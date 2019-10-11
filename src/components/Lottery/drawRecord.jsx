import React, {Component} from 'react';
import {Button, PageHeader, Table, Form, Input} from "antd";
import { getDrawRecord } from '../../redux/action/actionCreaters.jsx';
import store from '../../redux/store.jsx';
import {connect} from 'react-redux';
import {storage} from '../../assets/js/common.jsx';
const { Search } = Input;

class DrawRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            limit:100,
            offset:0
        };
    }

    componentDidMount() {
        this.getDrawRecordFunc();
    }

    //获取抽奖记录
    getDrawRecordFunc = (limit = this.state.limit,offset = 0, wechat = '') => {
        const params = {token: storage.get('token'), limit, offset, wechat};
        store.dispatch(getDrawRecord(params));
    };

    handleTableChange = (pagination) => {
        //console.log(pagination)//点击的哪一页
        this.getDrawRecordFunc(this.state.limit,(pagination - 1) * this.state.limit);
    };

    //返回抽奖设置
    toLottery = () => {
        this.props.history.push('/lottery/7');
    };
    render() {
        const {rows, total, errcode} = this.props.data;
        const color = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple','#f50','#2db7f5','#87d068','#108ee9'];
        const columns = [
            {
                title: '昵称',
                dataIndex: 'wechat',
                sorter: false,
                render: wechat => `${ wechat }`,
                width: '13%',
            },
            {
                title: '数量',
                dataIndex: 'prize_name',
                sorter: false,
                render: prize_name => `${prize_name}`,
                width: '20%',
            },
            {
                title: '消耗',
                dataIndex: 'cost_amount',
                sorter: false,
                render: cost_amount => `${cost_amount}`,
                width: '20%',
            },
            {
                title: '地点',
                dataIndex: 'address',
                render: address => `${address}`,
                width: '20%',
            },
            {
                title: '时间',
                dataIndex: 'ctime',
                sorter: false,
                render: ctime => `${ctime}`,
                width: '20%',
            }
        ];
        return (
            <div>
                <PageHeader title="抽奖记录" subTitle="所有抽奖记录" extra={[
                    <Search key="2" style={{width:'unset'}} placeholder="昵称搜索" onSearch={ (value) => this.getDrawRecordFunc(10,0,value)} enterButton />,
                    <Button key="1" type="primary" onClick={ this.toLottery }>返回抽奖设置</Button>,
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

const mapStateToProps = state => ({data: state.drawRecodeReducer.data});

export default connect(mapStateToProps, null)(DrawRecord);