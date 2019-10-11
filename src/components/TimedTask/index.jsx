import React, {Component} from 'react';
import {Table, Tag, Icon, Select, Button, PageHeader, message} from 'antd';
import { getTimedTask } from '../../redux/action/actionCreaters.jsx';
import { addTimedTaskHttp, editTimedTaskHttp, deleteTimedTaskHttp } from '../../http/http.jsx';
import ShowDeleteConfirm from '../../assets/js/deleteConfirm.jsx';
import ShowImgModal from '../../assets/js/showImgModal.jsx';
import store from '../../redux/store.jsx';
import {connect} from 'react-redux';
import {storage} from '../../assets/js/common.jsx';
import AddTaskModal from './addTaskModal.jsx';

class TimedTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            showHideModal:false,
            showImgModalState:false,
            currentSrc:'',
            is_edit: false,
            is_type: 0,
            recode:'',
            limit:50,
            offset:0
        };
    }

    componentDidMount() {
        this.getTimedTaskFunc();
    }

    edit = (recode) => {
        this.setState(() => ({recode, showHideModal: true, is_edit: true}));
    };

    //显示隐藏modal
    showModal = (is_show) => {
        this.setState(() => ({showHideModal: is_show, is_edit: false}))
    };

    //获取群列表数据
    getTimedTaskFunc = (limit = this.state.limit, offset = 0, is_type = this.state.is_type) => {
        const params = {token: storage.get('token'), limit, offset, is_type};
        store.dispatch(getTimedTask(params));
    };

    handleTableChange = (pagination) => {
        //console.log(pagination)//点击的哪一页
        this.getTimedTaskFunc(this.state.limit,(pagination - 1) * this.state.limit, this.state.is_type);
    };

    //筛选
    handleChange = (val) => {
        this.setState(() => ({ is_type: val }));
        this.getTimedTaskFunc(this.state.limit,0, val);
    };

    //添加定时任务
    addTimedTaskFunc = (params) => {
        addTimedTaskHttp(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                message.success('添加成功');
                this.getTimedTaskFunc();
                this.setState(() => ({showHideModal: false}))
            }else{
                message.error(`添加失败 ${data.errmsg}`)
            }
        })
    };

    //编辑定时任务
    editTimedTaskFunc = (params) => {
        editTimedTaskHttp(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                message.success('编辑成功');
                this.getTimedTaskFunc();
                this.setState(() => ({showHideModal: false}))
            }else{
                message.error(`编辑失败 ${data.errmsg}`)
            }
        })
    };

    //删除定时任务
    deleteTaskItem = (timer_id) => {
        const params = { token: storage.get('token'), timer_id };
        ShowDeleteConfirm(() => this.deleteTimedTaskFunc(params));
    };
    deleteTimedTaskFunc = (params) => {
        deleteTimedTaskHttp(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                message.success('删除成功');
                this.getTimedTaskFunc();
            }else{
                message.success(`删除失败 ${data.errmsg}`);
            }

        });
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
        const { is_edit, recode, currentSrc, showImgModalState } = this.state;
        const { Option } = Select;
        const color = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple','#f50','#2db7f5','#87d068','#108ee9'];
        const weekObj = { "sunday": "星期日", "monday": "星期一", "tuesday": "星期二", "wednesday": "星期三", "thursday": "星期四", "friday": "星期五","saturday": "星期六" };
        const columns = [
            {
                title: '日期',
                dataIndex: 'tx_content',
                sorter: false,
                render: tx_content => (
                    <span>
                        {tx_content.split('-').map((item, index) => {
                            return (
                                <Tag color={color[index]} key={index}>
                                    {weekObj[item]}
                                </Tag>
                            );
                        })}
                    </span>
                ),
                width: '20%',
            },
            {
                title: '时间',
                dataIndex: 'time',
                sorter: false,
                render: time => `${time}`,
                width: '20%',
            },
            {
                title: '内容',
                dataIndex: 'content',
                render: (content, send_type) => (send_type.send_type == 2 ? <img src={content} alt="" style={{width:'80px', height: '80px'}} onClick={() => this.showImg(content)} /> : content),
                width: '20%',
            },
            {
                title: '所属矿池',
                dataIndex: 'name',
                render: name => `${name ? name : '--'}`,
                width: '20%',
            },
            {
                title: '操作',
                dataIndex: 'id',
                render: (id, recode) => (
                    <div className='tab-edit-icon-box'>
                        <Icon className='icon' type="edit" onClick={()=>this.edit(recode)} theme="twoTone" />
                        <Icon className='icon' type="delete" onClick={()=>this.deleteTaskItem(`${id}`)} theme="twoTone" />
                    </div>
                    ),
                width: '9%',
            }
        ];
        const func = [ this.addTimedTaskFunc, this.editTimedTaskFunc ];
        return (
            <div>
                { this.state.showHideModal ? <AddTaskModal recode={ is_edit ? recode : '' } submitTimedTaskFunc={func} showModal={this.showModal} /> : null }
                { showImgModalState ? <ShowImgModal src={currentSrc} hideImgModal= {this.hideImgModal} /> : null }
                <PageHeader title="定时任务" subTitle="定时任务列表" extra={[
                    <Button key="1" type="primary" onClick={ () => this.showModal(true) }>添加</Button>,
                    <Select key="2" defaultValue="0" style={{ width: 120, marginLeft: '0.5rem' }} onChange={this.handleChange}>
                        <Option value="0">全部</Option>
                        <Option value="1">用户任务</Option>
                        <Option value="2">官方任务</Option>
                        <Option value="3">广告任务任务</Option>
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
const mapStateToProps = state => ({data: state.timedTaskReducer.data});
export default connect(mapStateToProps, null)(TimedTask);