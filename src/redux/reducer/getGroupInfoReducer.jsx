import {GROUP_INFO} from '../action/actionTypes.jsx';

const initialState = {
    is_show: false,
    data: {}
};
const getGroupInfoReducer = (state = initialState, action) => {
    if (action.type === GROUP_INFO) {
        const new_state = JSON.parse(JSON.stringify(state));
        new_state.data = action.payload;
        new_state.is_show = true;
        return new_state;
    }else {
        return state
    }
};
export default getGroupInfoReducer;