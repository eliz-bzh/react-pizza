import * as CONSTANTS from '../actions/actionTypes';

const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
}

const getTotalPrice = arr => arr.reduce((accum, item)=>accum + item.price, 0)

const cart = (state = initialState, action) => {
    switch (action.type) {
        case (CONSTANTS.ADD_ITEM_TO_CART): {
            const currentPizzas = !state.items[action.payload.id]
            ? [action.payload]
            : [...state.items[action.payload.id].items, action.payload];

            const newItem = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzas,
                    totalPriceByPizza: getTotalPrice(currentPizzas)
                }
            };

            const items = Object.values(newItem).map(obj=>obj.items)
            const pizzas = [].concat.apply([], items);
            const totalPrice = getTotalPrice(pizzas)
            
            return { ...state, 
                items: newItem, 
                totalCount: pizzas.length,
                totalPrice
            };
        }
        case (CONSTANTS.CLEAR_CART): {
            return { items: {}, totalCount: 0, totalPrice: 0 }
        }
        case (CONSTANTS.REMOVE_ITEM_FROM_CART): {
            const newItems = {
                ...state.items,
            };

            const currentTotalPrice = newItems[action.payload].totalPriceByPizza;
            const currentTotalCount = newItems[action.payload].items.length;
            delete newItems[action.payload];
             
            return { ...state,
                items: newItems,
                totalCount: state.totalCount - currentTotalCount,
                totalPrice: state.totalPrice - currentTotalPrice
            }
        }
        case (CONSTANTS.MINUS_ITEM): {
            
        }
        case (CONSTANTS.PLUS_ITEM): {

        }
        default: return state;
    }
}

export default cart;