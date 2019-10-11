import React from 'react';
import {Modal} from 'antd';

const ShowImgModal = (props) => {
    console.log(props);
    return (
        <Modal
            className='showImgModal'
            title=""
            visible={ true }
            // onOk={this.handleOk}
            onCancel={ () => props.hideImgModal() }
            footer={null}
        >
            <img src={props.src} alt=""/>
        </Modal>
    );
};

export default ShowImgModal;