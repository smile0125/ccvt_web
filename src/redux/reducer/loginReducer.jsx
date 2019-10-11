import {LOGIN} from '../action/actionTypes.jsx';
import {storage} from '../../assets/js/common.jsx';
import {message} from 'antd';

const initialState = {
    data: {}
};
const loginReducer = (state = initialState, action) => {
    if (action.type === LOGIN) {
        const new_state = JSON.parse(JSON.stringify(state));
        const data = action.payload;
        new_state.data = action.payload;
        if(data.errcode == 0){
            storage.set("token",data.token);
            message.success('登录成功');
            window.location.hash='/group/1';
        }else{
            message.error(data.errmsg);
        }
        return new_state;
    } else {
        return state
    }
};
export default loginReducer;