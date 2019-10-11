import React from 'react';
import { Modal, Button, Input, Form, DatePicker } from 'antd';
import store from "../../redux/store.jsx";
import {inputChange} from "../../redux/action/actionCreaters.jsx";
import { connect } from 'react-redux';

const CodeModal = (props) => {

    const handleInputChange = (e, type) => {
        const val = e.target.value;
        const params = {type, val};
        store.dispatch(inputChange(params))
    };

    function onChange(value, dateString) {
        // console.log('Selected Time: ', value);
        // console.log('Formatted Selected Time-dateString: ', dateString);
        const params = {type: 'time', val: dateString};
        store.dispatch(inputChange(params))
    }

    function onOk(value) {
        console.log('onOk: ', value);
    }

    return (
        <div>
            <Modal
                title="生成兑换码"
                visible={true}
                onCancel={props.hideModal}
                footer={[
                    <Button key="back" onClick={props.hideModal} >取消</Button>,
                    <Button key="submit" type="primary" onClick={props.generate}>生成</Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="兑换数量">
                        <Input placeholder='输入兑换数量' value={props.data.exchangeNum} onChange={ (e) => handleInputChange(e, 'exchangeNum') } />
                    </Form.Item>
                    <Form.Item label="兑换额度">
                        <Input placeholder='输入兑换额度' value={props.data.exchangeAmount} onChange={ (e) => handleInputChange(e, 'exchangeAmount') } />
                    </Form.Item>
                    <Form.Item label="过期时间">
                        <DatePicker showTime  placeholder="选择过期时间" onChange={onChange} onOk={onOk} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
const mapStateToProps = state => ({ data: state.inputChangeReducer });
export default connect(mapStateToProps)(CodeModal);