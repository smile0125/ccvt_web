import React, {Component} from 'react';
import {Table, Tag, Icon, PageHeader, Input, Select} from 'antd';
import { getGroupList } from '../../redux/action/actionCreaters.jsx';
import store from '../../redux/store.jsx';
import {connect} from 'react-redux';
import {storage} from '../../assets/js/common.jsx';
const { Search } = Input;
const { Option } = Select;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            limit:10,
            offset:0,
            search_name: '',
            group_manager: '',
            is_del: '',
        };
    }

    componentDidMount() {
        this.getGroupListFunc();
    }

    //矿池搜索输入
    searchPoolChange = (value) => {
        this.setState({ search_name: value }, () => this.getGroupListFunc());
    };
    searchPoolHandleChange = (e) => {
        e.target.value == '' && this.setState({ search_name: '' }, () => this.getGroupListFunc());
    };

    //矿主搜索输入
    searchPoolManagerChange = (value) => {
        this.setState({ group_manager: value }, () => this.getGroupListFunc());
    };
    searchPoolManagerHandleChange = (e) => {
        e.target.value == '' && this.setState({ group_manager: '' }, () => this.getGroupListFunc());
    };

    //运行状态搜索
    searchPoolDel = (value) => {
        this.setState({ is_del: value }, () => this.getGroupListFunc());
    };

    //点击跳转
    handleJump = (path, recode) => {
        this.props.history.push({pathname: path, params: recode});
    };

    //前往群详情
    toGroupInfo = (path, id) => {
        this.props.history.push({pathname: path, params: {group_id: id}});
};

    //获取群列表数据
    getGroupListFunc = (limit = this.state.limit, offset = 0) => {
        const { search_name, group_manager, is_del } = this.state;
        const params = {token: storage.get('token'), limit, offset, search_name, group_manager, is_del};
        store.dispatch(getGroupList(params));
        // this.setState({ search_name: '', group_manager: '', is_del:'' });
    };

    handleTableChange = (pagination) => {
        //console.log(pagination)//点击的哪一页
        this.getGroupListFunc(this.state.limit,(pagination - 1) * this.state.limit);
    };

    render() {
        const {rows, total, errcode} = this.props.data;
        const color = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple','#f50','#2db7f5','#87d068','#108ee9'];
        const columns = [
            {
                title: '等级',
                dataIndex: 'scale',
                sorter: (a, b) => a.scale - b.scale,
                render: scale => <Tag color={color[scale-1]}>{scale}</Tag>,
                width: '13%',
            },
            {
                title: '矿池',
                dataIndex: 'name',
                sorter: false,
                render: name => `${name}`,
                width: '13%',
            },
            {
                title: '矿主',
                dataIndex: 'group_manager',
                render: group_manager => `${group_manager}`,
                // filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
                width: '13%',
            },
            {
                title: '机器人',
                dataIndex: 'bot_name',
                render: bot_name => `${bot_name ? bot_name : '--'}`,
                width: '13%',
            },
            {
                title: '矿池人数',
                dataIndex: 'member_count',
                sorter: (a, b) => a.member_count - b.member_count,
                render: member_count => `${member_count}`,
                width: '13%',
            },
            {
                title: '微信绑定人数',
                dataIndex: 'bind_count',
                render: bind_count => `${bind_count}`,
                sorter: (a, b) => a.bind_count - b.bind_count,
                width: '13%',
            },
            {
                title: '运行状态',
                dataIndex: 'del',
                render: del => `${del}`,
                width: '13%',
            },{
                title: '操作',
                dataIndex: 'id',
                render: (id,recode) => (
                    <div className='tab-edit-icon-box'>
                        <Icon className='icon' title='编辑' type="edit" onClick={()=>this.handleJump('/editGroup/1', recode)} theme="twoTone" />
                        <Icon className='icon' type="info-circle" title='详情' onClick={()=>this.toGroupInfo('/groupInfo/1', id)} theme="twoTone" />
                    </div>
                    ),
                width: '9%',
            }
        ];
        return (
            <div>
                <PageHeader title="矿池列表" subTitle="矿池列表" extra={[
                    <Search key='1' style={{width:'200px'}} placeholder="矿池搜索" onChange={this.searchPoolHandleChange} onSearch={value => this.searchPoolChange(value)} enterButton />,
                    <Search key='2' style={{width:'200px'}} placeholder="矿主搜索" onChange={this.searchPoolManagerHandleChange} onSearch={value => this.searchPoolManagerChange(value)} enterButton />,
                    <Select key="3" defaultValue="0" style={{ width: 120, marginLeft:'0.5rem' }} onChange={ (value) => this.searchPoolDel(value) }>
                        <Option value="0">全部</Option>
                        <Option value="1">运行中</Option>
                        <Option value="2">关闭中</Option>
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
const mapStateToProps = state => ({data: state.groupListReducer.data});
export default connect(mapStateToProps, null)(Home);