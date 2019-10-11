import { GROUP_CASH_BACK} from '../action/actionTypes.jsx';

const initialState = {
    data: {}
};
const getGroupCashBackReducer = (state = initialState, action) => {
    if (action.type === GROUP_CASH_BACK) {
        const new_state = JSON.parse(JSON.stringify(state));
        new_state.data = action.payload;
        new_state.data.total = parseInt(new_state.data.total);
        return new_state;
    } else {
        return state
    }
};
export default getGroupCashBackReducer;