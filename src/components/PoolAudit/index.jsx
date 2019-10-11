import React, {Component} from 'react';
import {Button, Icon, PageHeader, Table} from "antd";
import { getPooList } from '../../redux/action/actionCreaters.jsx';
import store from '../../redux/store.jsx';
import {connect} from 'react-redux';
import {storage} from '../../assets/js/common.jsx';

class PoolAudit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            limit:10,
            offset:0
        };
    }

    componentDidMount() {
        this.getPooListFunc();
    }

    edit = (id) => {
        console.log(id)
    };

    //获取群列表数据
    getPooListFunc = (limit = 10,offset = 0) => {
        const params = {token: storage.get('token'), limit, offset};
        store.dispatch(getPooList(params));
    };

    handleTableChange = (pagination) => {
        //console.log(pagination)//点击的哪一页
        this.getPooListFunc(10,(pagination - 1) * this.state.limit);
    };

    render() {
        const {rows, total, errcode} = this.props.data;
        const color = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple','#f50','#2db7f5','#87d068','#108ee9'];
        const columns = [
            {
                title: '矿池名称',
                dataIndex: 'name',
                sorter: false,
                render: name => `${ name }`,
                width: '20%',
            },
            {
                title: '申请者',
                dataIndex: 'wechat',
                sorter: false,
                render: wechat => `${wechat}`,
                width: '20%',
            },
            {
                title: 'AI昵称',
                dataIndex: 'bot_name',
                render: bot_name => `${bot_name}`,
                width: '20%',
            },
            {
                title: '时间',
                dataIndex: 'ctime',
                sorter: false,
                render: ctime => `${ctime}`,
                width: '20%',
            },{
                title: '操作',
                dataIndex: 'id',
                render: id => (
                    <div className='tab-edit-icon-box'>
                        <Icon className='icon' type="check-square" onClick={()=>this.edit(`${id}`)} theme="twoTone" />
                        {/*<Icon className='icon' type="delete" onClick={()=>this.edit(`${id}`)} theme="twoTone" />*/}
                    </div>
                    ),
                width: '9%',
            }
        ];
        return (
            <div>
                <PageHeader title="矿池审核" subTitle="矿池审核列表" />
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

const mapStateToProps = state => ({data: state.poolListReducer.data});

export default connect(mapStateToProps, null)(PoolAudit);