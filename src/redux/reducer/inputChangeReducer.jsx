import { INPUT_CHANGE, GET_LOTTERY_RULES } from '../action/actionTypes.jsx';

const initialState = {
    prize_free_number: '0',
    prize_amount: '0',
};

const inputChangeReducer = (state = initialState, action) => {
    if(action.type == INPUT_CHANGE){
        let new_state = JSON.parse(JSON.stringify(state));
        new_state[action.payload.type] = action.payload.val;
        return new_state
    }if(action.type == GET_LOTTERY_RULES){
        const data = action.payload.row;
        let new_state = JSON.parse(JSON.stringify(state));
        new_state.prize_free_number = data.prize_free_number;
        new_state.prize_amount = data.prize_amount;
        return new_state
    }else{
        return state
    }
};

export default inputChangeReducer;