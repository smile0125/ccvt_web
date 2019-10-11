import {GET_POOL_CYCLE_LIST} from '../action/actionTypes.jsx';

const initialState = {
    data: {}
};
const getPoolCycleListReducer = (state = initialState, action) => {
    if (action.type === GET_POOL_CYCLE_LIST) {
        const new_state = JSON.parse(JSON.stringify(state));
        new_state.data = action.payload;
        new_state.data.total = parseInt(new_state.data.total);
        return new_state;
    } else {
        return state
    }
};
export default getPoolCycleListReducer;