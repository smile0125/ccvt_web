import {SELECT_POOL_CYCLE} from '../action/actionTypes.jsx';

const initialState = {
    data: {}
};
const selectPoolCycleListReducer = (state = initialState, action) => {
    if (action.type === SELECT_POOL_CYCLE) {
        const new_state = JSON.parse(JSON.stringify(state));
        new_state.data = action.payload;
        return new_state;
    } else {
        return state
    }
};
export default selectPoolCycleListReducer;