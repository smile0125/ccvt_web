import React, {Component} from 'react';
import { Modal, Button, Checkbox, Form, Select, Radio, TimePicker, Input, message } from 'antd';
import moment from 'moment';
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { TextArea } = Input;
import { getGroupList } from '../../redux/action/actionCreaters.jsx';
import Upload from '../../assets/js/upload.jsx';
import store from '../../redux/store.jsx';
import {storage} from "../../assets/js/common.jsx";
import {connect} from 'react-redux';

const plainOptions = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

class AddTaskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedList: plainOptions,
            indeterminate: true,
            checkAll: true,
            selectGroupDisabled: false,
            isCheckedAllGroup: false,
            timeChange: false,
            selectDefaultValue: '选择群',
            is_edit: false,

            group_id:'',
            tx_content:['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            tx_content_obj: {'星期日': 'sunday', '星期一': 'monday', '星期二': 'tuesday', '星期三': 'wednesday', '星期四': 'thursday', '星期五': 'friday', '星期六': 'saturday'},
            send_type: 1,
            type:1,
            content: '',
            time: new Date(),
            timer_id:'',
        };
    }

    componentDidMount() {
        this.getAllGroupListFunc();
        const recode = this.props.recode;
        if(recode){
            const { content, group_id, time, send_type, type, name, id } = recode;
            this.setState(() => ({is_edit: true, timer_id:id, content, group_id, time, send_type, type, isCheckedAllGroup: group_id == -1 ? true : false , selectGroupDisabled: group_id == -1 ? true : false, selectDefaultValue: group_id != -1 ? name : '选择群'}));
        }
    }
    //获取群列表
    getAllGroupListFunc = () => {
        const params = {token: storage.get('token'), limit: 100000, offset: 0};
        store.dispatch(getGroupList(params));
    };

    //日期选择某一项
    onChange = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
            tx_content: checkedList,
            type: 2
        });
    };

    //日期选择所有
    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
            type: 1
        });
    };
    //选择所有群
    allGroupSelected = (e) => {
        if(e.target.checked){
            this.setState({group_id: '-1', selectGroupDisabled:true, isCheckedAllGroup: true})
        }else{
            this.setState({group_id: '', selectGroupDisabled:false, isCheckedAllGroup: false})
        }
    };

    //选择某一个群
    selectGroupItem = (v) => {
        this.setState({group_id: v})
    };

    //选择时间
    timeChange = (time) => {
        this.setState({time, timeChange: true});
    };

    //类型选择
    sendTypeChange = (e) => {
        this.setState({send_type: e.target.value})
    };

    //内容
    contentChange = (e) => {
        this.setState({content: e.target.value})
    };

    //转化时间
    transformTime = (time) => {
        const hours = time.split(':')[0];
        const hours_left = hours.substr(0, 1);
        const hours_right = hours.substr(1, 1);
        const minutes = time.split(':')[1];
        const minutes_left = minutes.substr(0, 1);
        const minutes_right = minutes.substr(1, 1);
        let _hours = hours_left == 0 ? hours_right : hours;
        let _minutes = minutes_left == 0 ? minutes_right : minutes;
        return `${_hours}:${_minutes}`;
    };

    //提交定时任务
    addTaskFunc = () => {
        const { group_id, time, content, send_type, tx_content, type, timeChange, is_edit, timer_id } = this.state;
        let _time = '';

        if(is_edit && timeChange){
            _time = this.transformTime(time.format('HH:mm'));
        }else if(is_edit){
            _time = time;
        }else{
            // console.log('other')
            let curr_time = timeChange ? time.format('HH:mm') :  moment(Date.parse(time)).format('HH:mm');
            _time = this.transformTime(curr_time);
        }

        if(!group_id){
            message.error('请选择发送群');
            return
        }
        if(!tx_content){
            message.error('请选择发送日期');
            return
        }
        if(!content){
            message.error('请输入内容');
            return
        }
        let _tx_content = '';
        tx_content.forEach((item) => {
            _tx_content += `${this.state.tx_content_obj[item]}-`;
        });
        _tx_content = _tx_content.substring(_tx_content.length-1, 0);
        const params = { token: storage.get('token'), group_id, "time": _time, content, send_type, tx_content: _tx_content, type, timer_id};
        const  submitTimedTaskFunc  = this.props.submitTimedTaskFunc;
        is_edit ? submitTimedTaskFunc[1](params) : submitTimedTaskFunc[0](params);
    };

    //获取上传后的图片地址
    getUploadImgSrc = (src) => {
        // console.log(src);
        this.setState(() => ({content: src}));
    };

    render() {
        const groupList = this.props.data.rows;
        return (
            <div>
                <Modal
                    title="定时任务"
                    visible={ true }
                    // onOk={this.handleOk}
                    onCancel={ () => this.props.showModal(false) }
                    footer={[
                        <Button key="back" onClick={ () => this.props.showModal(false) }>
                            关闭
                        </Button>,
                        <Button key="submit" type="primary" onClick={ this.addTaskFunc }>提交</Button>
                    ]}
                >
                    <div>
                        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
                            <Form.Item label='所有群'>
                                <Checkbox checked={ this.state.isCheckedAllGroup } onChange={this.allGroupSelected}>全选</Checkbox>
                            </Form.Item>
                            <Form.Item label='选择群'>
                                <Select defaultValue={ this.state.selectDefaultValue } disabled={ this.state.selectGroupDisabled } onChange={this.selectGroupItem}>
                                    {
                                        groupList ? groupList.map((item, index) => {
                                            return <Option key={item.id} value={item.id}>{ item.name }</Option>
                                        }) : null
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label='日期'>
                                <Checkbox
                                    indeterminate={this.state.indeterminate}
                                    onChange={this.onCheckAllChange}
                                    checked={this.state.checkAll}
                                >全选
                                </Checkbox>
                                <CheckboxGroup
                                    options={plainOptions}
                                    value={this.state.checkedList}
                                    onChange={this.onChange}
                                />
                            </Form.Item>

                            <Form.Item label='时间'>
                                <TimePicker onChange={ (e) => this.timeChange(e) } placeholder='请选择时间' value={moment(this.state.time, 'HH:mm')} format='HH:mm' />
                            </Form.Item>

                            <Form.Item label='类型'>
                                <Radio.Group defaultValue={ parseInt(this.state.send_type) } onChange={this.sendTypeChange}>
                                    <Radio value={1}>文本</Radio>
                                    <Radio value={2}>图片</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label='内容'>
                                { this.state.send_type == 2 ? <img src={this.state.content} alt=""/> : null }
                                { this.state.send_type == 1 ? <TextArea onChange={this.contentChange} value={this.state.content} /> : <Upload getUploadImgSrc={this.getUploadImgSrc} /> }
                            </Form.Item>

                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => ({data: state.groupListReducer.data});
export default connect(mapStateToProps, null)(AddTaskModal);