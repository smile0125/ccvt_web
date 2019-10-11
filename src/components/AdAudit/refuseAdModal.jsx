import React from 'react';
import { Modal, Button, Input } from 'antd';
import store from '../../redux/store.jsx';
import {inputChange} from '../../redux/action/actionCreaters.jsx';
import { connect } from 'react-redux';
const { TextArea } = Input;

const RefuseAdModal = (props) => {
    const handleInputChange = (e, type) => {
        const val = e.target.value;
        const params = {type, val};
        store.dispatch(inputChange(params))
    };

    return (
        <div>
            <Modal
                title="填写拒绝原因"
                visible={true}
                onCancel={props.handleModalCancel}
                footer={[
                    <Button key="back" onClick={ () => props.refuseVoteBtn('direct') } >直接拒绝</Button>,
                    <Button key="submit" type="primary" onClick={props.refuseVoteBtn}>拒绝</Button>,
                ]}
            >
                <TextArea rows={4} value={props.data.why}  onChange={ (e) => handleInputChange(e,'why') } placeholder='请填写拒绝原因' />
            </Modal>
        </div>
    );
};

const mapStateToProps = state => ({ data: state.inputChangeReducer });
export default connect(mapStateToProps, null)(RefuseAdModal);