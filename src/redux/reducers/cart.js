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

            const pizzas = [].concat.apply([], Object.values(newItem));
            const totalPrice = pizzas.reduce((accum, item)=>accum + item.price,0);
            
            return { ...state, 
                items: newItem, 
                totalCount: pizzas.length,
                totalPrice
            };
        }
        default: return state;
    }
}

export default cart;