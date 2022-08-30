import * as CONSTANTS from '../actions/actionTypes';

const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case (CONSTANTS.ADD_ITEM_TO_CART): {
            const newItem = {
                ...state.items,
                [action.payload.id]: !state.items[action.payload.id]
                    ? [action.payload]
                    : [...state.items[action.payload.id], action.payload]
            };
            return { ...state, 
                items: newItem, 
                totalCount: [].concat.apply([], Object.values(newItem)).length 
            };
        }
        default: return state;
    }
}

export default cart;