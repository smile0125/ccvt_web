import { Modal } from 'antd';
const { confirm } = Modal;
const ShowDeleteConfirm = (func, content = '') => {
    confirm({
        title: '确定删除该内容?',
        content: content,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            console.log('OK');
            func();
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};

export default ShowDeleteConfirm;