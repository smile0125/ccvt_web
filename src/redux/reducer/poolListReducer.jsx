import {POOL_LIST} from '../action/actionTypes.jsx';

const initialState = {
    data: {}
};
const poolListReducer = (state = initialState, action) => {
    if (action.type === POOL_LIST) {
        const new_state = JSON.parse(JSON.stringify(state));
        new_state.data = action.payload;
        new_state.data.total = parseInt(new_state.data.total);
        return new_state;
    } else {
        return state
    }
};
export default poolListReducer;