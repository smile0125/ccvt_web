import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../redux/store.jsx';
import {storage} from '../../assets/js/common.jsx';
import {Button, Icon, PageHeader, Table, message} from "antd";
import { getPrizeList } from '../../redux/action/actionCreaters.jsx';
import ShowDeleteConfirm from '../../assets/js/deleteConfirm.jsx';
import { deletePrizeItemHttp, editPrizeItemHttp } from '../../http/http.jsx';
import EditPrizeItemModal from "./editPrizeItemModal.jsx";
import {AssignmentInput} from '../../assets/js/handleInputChange.jsx';

class PrizeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            showModal:false,
            limit:50,
            offset:0
        };
    }

    componentDidMount() {
        this.getPrizeListFunc();
    }

    //获取奖品列表数据
    getPrizeListFunc = (limit = this.state.limit,offset = 0) => {
        const params = {token: storage.get('token'), limit, offset};
        store.dispatch(getPrizeList(params));
    };

    handleTableChange = (pagination) => {
        //console.log(pagination)//点击的哪一页
        this.getPrizeListFunc(this.state.limit,(pagination - 1) * this.state.limit);
    };

    //编辑显示modal
    editItem = (recode) => {
        const { prize_id, type, prize_name, prize_value, prize_v, prize_level, number, lottery_number } = recode;
        const data = { prize_id, type, prize_name, prize_value, prize_v, prize_level, number, lottery_number };
        AssignmentInput(data);
        this.setState(() => ({showModal:true}));
    };

    //提交编辑
    editPrizeItemSubmitFunc = () => {
        const { prize_id, type, prize_name, prize_value, prize_v, prize_level, number, lottery_number } = this.props.inputData;
        const token = storage.get('token');
        const params = { token, prize_id, type, prize_name, prize_value, prize_v, prize_level, number, lottery_number };
        if(type !== 0 && type !== 1){ message.error('请选择正确的奖品类型'); return; }
        if(!prize_name){ message.error('请输入奖品名称'); return; }
        if(!prize_value){ message.error('请输入奖品数量'); return; }
        if(!prize_v){ message.error('请输入中奖概率'); return; }
        if(!prize_level){ message.error('请输入中奖权重'); return; }
        editPrizeItemHttp(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                message.success('设置成功');
                this.getPrizeListFunc();
                this.hideModal();
            }else{
                message.error(`编辑失败 ${data.errmsg}`);
            }
        })
    };

    //隐藏modal
    hideModal = () => {
        this.setState(() => ({showModal:false}));
    };

    //删除某一项
    deleteItem = (prize_id) => {
        ShowDeleteConfirm(() => this.confirmDeletePrizeItem(prize_id));
    };

    //确认删除
    confirmDeletePrizeItem = (prize_id) => {
        const token = storage.get('token');
        const params = { token, prize_id };
        deletePrizeItemHttp(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                message.success('删除成功');
                this.getPrizeListFunc();
            }else{
                message.error(`删除失败 ${data.errmsg}`);
            }
        })
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
                title: '奖品名称',
                dataIndex: 'prize_name',
                sorter: false,
                render: prize_name => `${ prize_name }`,
                width: '13%',
            },
            {
                title: '奖品数量',
                dataIndex: 'prize_value',
                sorter: false,
                render: prize_value => `${prize_value}`,
                width: '13%',
            },
            {
                title: '中奖概率',
                dataIndex: 'prize_v',
                render: prize_v => `${prize_v}`,
                width: '13%',
            },
            {
                title: '中奖权重',
                dataIndex: 'prize_level',
                sorter: (a, b) => a.prize_level - b.prize_level,
                render: prize_level => `${prize_level}`,
                width: '13%',
            },
            {
                title: '其他设置',
                dataIndex: 'number',
                render: (number, recode) => (parseInt(number) > 0 ? `${number}次内必中${recode.lottery_number}次` : '未设置'),
                sorter: false,
                width: '13%',
            },{
                title: '操作',
                dataIndex: 'prize_id',
                render: (prize_id, recode) => (
                    <div className='tab-edit-icon-box'>
                        <Icon className='icon' type="edit" onClick={()=>this.editItem(recode)} theme="twoTone" />
                        <Icon className='icon' type="delete" onClick={()=>this.deleteItem(`${prize_id}`)} theme="twoTone" />
                    </div>
                    ),
                width: '9%',
            }
        ];
        return (
            <div>
                <PageHeader title="奖品列表" subTitle="奖品列表" extra={[<Button key="1" type="primary" onClick={ this.toLottery }>返回抽奖设置</Button>,]} />
                { this.state.showModal ? <EditPrizeItemModal prizeSetSubmit={this.editPrizeItemSubmitFunc} getPrizeListFunc={this.getPrizeListFunc} item={this.state.item} hideModal={this.hideModal} /> : null }
                <Table
                    columns={columns}
                    rowKey={record => record.prize_id}
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
    data: state.prizeListReducer.data,
    inputData:state.inputChangeReducer
});

export default connect(mapStateToProps, null)(PrizeList);