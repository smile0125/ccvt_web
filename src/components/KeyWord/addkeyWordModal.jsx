import React, {Component} from 'react';
import {Modal, Button, Form, Radio, Input} from 'antd';
import { connect } from 'react-redux';
import {HandleInputChange} from '../../assets/js/handleInputChange.jsx';
import Upload from '../../assets/js/upload.jsx';
import {AssignmentInput} from '../../assets/js/handleInputChange.jsx';
const { TextArea } = Input;

class AddKeyWordModal extends Component {
    //获取上传后的图片地址
    getUploadImgSrc = (src) => {
        const data = { answer: src};
        AssignmentInput(data);
    };
    render() {
        const { ask, answer, send_type } = this.props.data;
        return (
            <div>
                <Modal
                    title="关键字设置"
                    visible={true}
                    onCancel={ ()=>this.props.showHideModalFunc(false) }
                    footer={[
                        <Button key="back" onClick={ ()=>this.props.showHideModalFunc(false) }>取消</Button>,
                        <Button key="submit" type="primary" onClick={ this.props.addKeyWordSubmit }>提交</Button>,
                    ]}
                >
                    <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                        <Form.Item label="类型" validateStatus="error" help="">
                            <Radio.Group defaultValue={ send_type == 2 ? 2 : 1 } onChange={ (e) => HandleInputChange(e, 'send_type') } >
                                <Radio value={1}>文本</Radio>
                                <Radio value={2}>图片</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="关键字" validateStatus="" help="">
                            <Input placeholder="关键字" value={ask}  onChange={ (e) => HandleInputChange(e, 'ask') } />
                        </Form.Item>
                            <Form.Item label="回复内容" validateStatus="" help="">
                                { send_type == 2 ? <img src={ answer } alt=""/> : null }
                                { send_type == 2 ? <Upload getUploadImgSrc={this.getUploadImgSrc} /> :
                                    <TextArea rows={4} value={answer} onChange={ (e) => HandleInputChange(e, 'answer') } />
                                }
                            </Form.Item>

                    </Form>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => ({ data: state.inputChangeReducer });
export default connect(mapStateToProps, null)(AddKeyWordModal);
