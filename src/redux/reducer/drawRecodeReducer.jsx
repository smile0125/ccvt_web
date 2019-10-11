import {GET_DRAW_RECODE} from '../action/actionTypes.jsx';

const initialState = {
    data: {}
};
const drawRecodeReducer = (state = initialState, action) => {
    if (action.type === GET_DRAW_RECODE) {
        const new_state = JSON.parse(JSON.stringify(state));
        new_state.data = action.payload;
        new_state.data.total = parseInt(new_state.data.total);
        return new_state;
    } else {
        return state
    }
};
export default drawRecodeReducer;