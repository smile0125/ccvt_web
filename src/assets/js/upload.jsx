import React, {Component} from 'react';
import { Icon, message, Progress } from "antd";
import {getKeyCode} from '../../redux/action/actionCreaters.jsx';
import store from '../../redux/store.jsx';
import {storage} from "../../assets/js/common.jsx";
import {connect} from 'react-redux';
import {uploadImgHttp} from '../../http/http.jsx';

class _Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: '',
            key_code: '',
            progress: 0,
            imgSrc: '',
        }
    }

    componentDidMount() {
        //获取keyCode
        this.getKeyCodeFunc();
    }

    getKeyCodeFunc = () => {
        const params = {token: storage.get('token')};
        store.dispatch(getKeyCode(params));
    };

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('请上传正确的图片格式');
            return
        }
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            message.error('上传文件在1M以内');
            return
        }
        return isJpgOrPng && isLt1M;
    };

    handleImgChange = (e) =>{
        const file = e.target.files[0];
        const is_img =  this.beforeUpload(file);
        if(is_img){
            let formData = new FormData();
            formData.append('file', file);
            formData.append('key_code', this.props.data.key_code);
            this.uploadImgFunc(formData);
        }
    };

    uploadImgFunc = (formData) => {

        const params = formData;
        uploadImgHttp(params, res => {
            if(res.errcode == 0){
                message.success('上传成功');
                const src = res.url;
                const { getUploadImgSrc } = this.props;
                getUploadImgSrc(src);
            }
        }, res => {
            message.error(`上传失败 ${res}`);
            return;
        }, (loaded,total) => {
            if(loaded !== total){
                let progress = Math.floor((loaded / total) * 100) + '%';
                this.setState(() => ({ progress: parseInt(progress) }))
            }else{
                this.setState(() => ({ progress: parseInt('100%') }))
            }
        })
    };

    render() {
        return (
            <div>
                <div className='upload-box'>
                    <input type="file" className='upload' onChange={(e) => this.handleImgChange(e)}/>
                    <span className='text'>上传</span>
                </div>
                { this.state.progress > 0 ? <Progress percent={ this.state.progress } /> : null }

            </div>
        );
    }
}

const mapStateToProps = state => ({data: state.getKeyCodeReducer.data});
export default connect(mapStateToProps, null)(_Upload);