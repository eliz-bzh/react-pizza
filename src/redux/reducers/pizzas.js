import * as CONSTANTS from '../actions/actionTypes';

const initialState = {
    items: [],
    isLoaded: false
}

const pizzas = (state = initialState, action) => {
    switch (action.type) {
        case (CONSTANTS.SET_PIZZAS): {
            return { ...state, items: action.payload, isLoaded: true };
        }
        case (CONSTANTS.SET_LOADER): {
            return { ...state, isLoaded: action.payload };
        }
        default: return state;
    }
}

export default pizzas;