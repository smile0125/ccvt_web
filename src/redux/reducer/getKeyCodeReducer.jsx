import { GET_KEY_CODE } from '../action/actionTypes.jsx';

const initialState = {
    data: ''
};

const getKeyCodeReducer = (state = initialState, action) => {
    if (action.type === GET_KEY_CODE) {
        const new_state = JSON.parse(JSON.stringify(state));
        new_state.data = action.payload;
        return new_state;
    } else {
        return state
    }
};

export default getKeyCodeReducer;