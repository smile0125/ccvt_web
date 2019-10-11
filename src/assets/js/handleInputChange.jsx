import store from '../../redux/store.jsx';
import { inputChange } from '../../redux/action/actionCreaters.jsx';

//输入框输入
export const HandleInputChange = (e, type) => {
    const val = e.target.value;
    const params = {val, type};
    store.dispatch(inputChange(params))
};

//直接给输入框赋值
export const AssignmentInput = (data) => {
    for(let key in data){
        let params = {val: data[key], type: key};
        store.dispatch(inputChange(params))
    }
};