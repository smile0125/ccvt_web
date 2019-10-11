import {CODE} from '../action/actionTypes.jsx';

const initialState = {
    data: {}
};
const conversionCodeReducer = (state = initialState, action) => {
    if (action.type === CODE) {
        const new_state = JSON.parse(JSON.stringify(state));
        new_state.data = action.payload;
        new_state.data.total = parseInt(new_state.data.total);
        return new_state;
    } else {
        return state
    }
};
export default conversionCodeReducer;