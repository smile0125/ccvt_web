import React from 'react';
import { Modal, Button } from 'antd';
import PrizeSet from './prizeSet.jsx';

const EditPrizeItemModal =(props) => {
    return (
        <div>
            <Modal
                title="修改奖品设置"
                visible={true}
                onCancel={props.hideModal}
                footer={[ <Button key="back" onClick={props.hideModal}>关闭</Button> ]}
            >
                <PrizeSet prizeSetSubmit={props.prizeSetSubmit} getPrizeListFunc={props.getPrizeListFunc} />
            </Modal>
        </div>
    );
};

export default EditPrizeItemModal;