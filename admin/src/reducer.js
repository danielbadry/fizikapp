import { INCREASE_CAT } from './constant';
const initialState = {
    count: 4,
}

const clone = obj => JSON.parse(JSON.stringify(obj));

const catReducer = (state = initialState, action) => {

    switch(action.type) {
        case INCREASE_CAT:
            state.count += action.payLoad.howMuch;
            return clone(state);
        
        default: return state;
    }
}

export default catReducer;