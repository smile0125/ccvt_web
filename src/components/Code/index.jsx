import React, {Component} from 'react';
import {Table, Button, Tag, PageHeader, message} from 'antd';
import { conversionCode } from '../../redux/action/actionCreaters.jsx';
import { generateHttp } from '../../http/http.jsx';
import store from '../../redux/store.jsx';
import {connect} from 'react-redux';
import {storage} from '../../assets/js/common.jsx';
import CodeModal from './codeModal.jsx';

class Conversion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            showModalState:false,
            limit:100,
            offset:0
        };
    }

    componentDidMount() {
        this.getCodeFunc();
    }

    //获取列表数据
    getCodeFunc = (limit = this.state.limit, offset = 0) => {
        const params = {token: storage.get('token'), limit, offset};
        store.dispatch(conversionCode(params));
    };

    handleTableChange = (pagination) => {
        //console.log(pagination)//点击的哪一页
        this.getCodeFunc(this.state.limit,(pagination - 1) * this.state.limit);
    };

    //显示modal
    showModal = () => {
        this.setState({showModalState:true});
    };
    //隐藏modal
    hideModal = () => {
        this.setState({showModalState:false});
    };

    //生成兑换码
    generate = () => {
        const inputData = this.props.inputData;
        const token = storage.get('token');
        const {exchangeNum, exchangeAmount, time} = inputData;
        const params = {token, num: exchangeNum, price: exchangeAmount, expiry_date: time };
        generateHttp(params).then(res => {
            console.log(res);
            const data = res.data;
            if(data.errcode == 0){
                this.setState({showModalState: false});
                this.getCodeFunc();
                message.success('兑换码生成成功');
            }else{
                message.success(`兑换码生成失败 ${data.errmsg}`);
            }
        })
    };

    render() {
        const {rows, total, errcode} = this.props.data;
        const color = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple','#f50','#2db7f5','#87d068','#108ee9'];
        const columns = [
            {
                title: '兑换码',
                dataIndex: 'coupon_code',
                sorter: false,
                render: coupon_code => `${coupon_code}`,
                width: '14%',
            },
            {
                title: '额度',
                dataIndex: 'amount',
                sorter: false,
                render: amount => `${amount}`,
                width: '14%',
            },
            {
                title: '状态',
                dataIndex: 'is_effective',
                render: is_effective => (
                    <Tag color={`${is_effective == 1 ? 'green' : 'red'}`}>
                        { is_effective == 1 ? '有效' : '无效' }
                    </Tag>
                ),
                width: '14%',
            },
            {
                title: '兑换者',
                dataIndex: 'us_account',
                render: us_account => `${us_account ? us_account : '--'}`,
                width: '14%',
            },
            {
                title: '兑换时间',
                dataIndex: 'exchange_time',
                render: exchange_time => `${exchange_time ? exchange_time : '--'}`,
                width: '14%',
            },{
                title: '过期时间',
                dataIndex: 'expiry_date',
                render: expiry_date => `${expiry_date}`,
                width: '14%',
            },
        ];
        return (
            <div>
                <PageHeader title="兑换码" subTitle="兑换码列表" extra={[<Button key="1" type="primary" onClick={this.showModal}>生成兑换码</Button>]} />
                { this.state.showModalState ? <CodeModal generate={this.generate} hideModal = {this.hideModal} /> : null }

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
    data: state.conversionCodeReducer.data,
    inputData: state.inputChangeReducer
});
export default connect(mapStateToProps, null)(Conversion);