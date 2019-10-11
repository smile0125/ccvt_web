import React, {Component} from 'react';
import {Table, Icon, Button, PageHeader, message} from 'antd';
import { getKeyWord } from '../../redux/action/actionCreaters.jsx';
import store from '../../redux/store.jsx';
import {connect} from 'react-redux';
import {storage} from '../../assets/js/common.jsx';
import AddKeyWordModal from './addkeyWordModal.jsx';
import { addKeyWordHttp, deleteKeyWordHttp, editKeyWordHttp } from '../../http/http.jsx';
import ShowDeleteConfirm from '../../assets/js/deleteConfirm.jsx';
import {AssignmentInput} from '../../assets/js/handleInputChange.jsx';
import ShowImgModal from '../../assets/js/showImgModal.jsx';


class KeyWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            showModal:false,
            is_edit:false,
            item:'',
            showImgModalState:false,
            currentSrc:'',
            limit:50,
            offset:0
        };
    }

    componentDidMount() {
        this.getKeyWordFunc();
    }

    //获取列表数据
    getKeyWordFunc = (limit = this.state.limit, offset = 0, is_type = 0) => {
        const params = {token: storage.get('token'), limit, offset, is_type};
        store.dispatch(getKeyWord(params));
    };

    handleTableChange = (pagination) => {
        //console.log(pagination)//点击的哪一页
        this.getKeyWordFunc(this.state.limit,(pagination - 1) * this.state.limit, 0);
    };

    //显示隐藏modal
    showHideModalFunc = (type) => {
        this.setState(() => ({ showModal: type, is_edit:false }));
    };

    //提交添加关键字回复
    addKeyWordSubmit = () => {
        const { ask, answer, send_type:_send_type } = this.props.inputData;
        const token = storage.get('token');
        const send_type = _send_type || 1;//1-文本 2-图片
        const params = { token, ask, answer, send_type };
        addKeyWordHttp(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                message.success('设置成功');
                this.getKeyWordFunc();
                this.setState(() => ({showModal: false}));
            }else{
                message.error(`设置失败 ${data.errmsg}`);
            }
        });
    };

    //删除某一项
    deleteKeyWordItem = (key_id) => {
        ShowDeleteConfirm( () => this.confirmDeleteKeyWordItem(key_id) )
    };
    //确认删除
    confirmDeleteKeyWordItem = (key_id) => {
        const token = storage.get('token');
        const params = {token, key_id};
        deleteKeyWordHttp(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                message.success('删除成功');
                this.getKeyWordFunc();
            }else{
                message.error(`删除失败 ${data.errmsg}`);
            }
        })
    };

    //编辑关键字显示modal
    editKeyWordItem = (recode) => {
        const { ask, answer, send_type } = recode;
        const data = { ask, answer, send_type };
        AssignmentInput(data);
        this.showHideModalFunc(true);
        this.setState(() => ({item: recode, is_edit: true}))
    };

    //确认编辑
    confirmEditKeyWordItem = () => {
        const token = storage.get('token');
        const { ask, answer } = this.props.inputData;
        const { id, send_type } = this.state.item;
        const params = { token, ask, answer, send_type, key_id: id};
        editKeyWordHttp(params).then(res => {
            const data = res.data;
            if(data.errcode == 0){
                message.success('处理成功');
                this.getKeyWordFunc();
                this.showHideModalFunc(false);
            }else{
                message.error(`处理失败 ${data.errmsg}`);
            }
        })
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
        const { currentSrc, showImgModalState } = this.state;
        const color = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple','#f50','#2db7f5','#87d068','#108ee9'];
        const columns = [
            {
                title: '关键字',
                dataIndex: 'ask',
                sorter: false,
                render: ask => `${ask}`,
                width: '20%',
            },
            {
                title: '内容',
                dataIndex: 'answer',
                sorter: false,
                render: (answer, send_type) => (send_type.send_type == 2 ? <img src={answer} alt="" style={{width:'80px', height: '80px'}} onClick={() => this.showImg(answer)} /> : answer),
                width: '35%',
            },
            {
                title: '矿池',
                dataIndex: 'group_name',
                render: group_name => `${group_name}`,
                width: '20%',
            },
            {
                title: '时间',
                dataIndex: 'ctime',
                render: ctime => `${ctime}`,
                width: '15%',
            },
            {
                title: '操作',
                dataIndex: 'id',
                render: (id, recode) => (
                    <div className='tab-edit-icon-box'>
                        <Icon className='icon' type="edit" onClick={()=>this.editKeyWordItem(recode)} theme="twoTone" />
                        <Icon className='icon' type="delete" onClick={()=>this.deleteKeyWordItem(`${id}`)} theme="twoTone" />
                    </div>
                    ),
                width: '10%',
            }
        ];
        return (
            <div>
                { showImgModalState ? <ShowImgModal src={currentSrc} hideImgModal= {this.hideImgModal} /> : null }
                <PageHeader title="关键字" subTitle="关键字列表" extra={[<Button key="1" type="primary" onClick={ () => this.showHideModalFunc(true) }>添加</Button>]} />
                { this.state.showModal ? <AddKeyWordModal addKeyWordSubmit={ this.state.is_edit ? this.confirmEditKeyWordItem : this.addKeyWordSubmit } showHideModalFunc={this.showHideModalFunc} /> : null }
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
const mapStateToProps = state => ({data: state.keyWordReducer.data, inputData: state.inputChangeReducer});
export default connect(mapStateToProps, null)(KeyWord);