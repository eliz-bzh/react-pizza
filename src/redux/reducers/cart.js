import * as CONSTANTS from '../actions/actionTypes';

const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
}

const getTotalPrice = arr => arr.reduce((accum, item)=>accum + item.price, 0)

const getObjTotalSums = objItem => {
    const items = Object.values(objItem).map(obj=>obj.items);
    const pizzas = [].concat.apply([], items);
    const totalPrice = getTotalPrice(pizzas);
    const totalCount = pizzas.length;

    return { totalCount, totalPrice }
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case (CONSTANTS.ADD_ITEM_TO_CART): {
            const pizzaKey = `${action.payload.id}-${action.payload.size}-${action.payload.type}`;
            const currentPizzas = !state.items[pizzaKey]
            ? [action.payload]
            : [...state.items[pizzaKey].items, action.payload];

            const newItem = {
                ...state.items,
                [pizzaKey]: {
                    items: currentPizzas,
                    totalPriceByPizza: getTotalPrice(currentPizzas)
                }
            };

            const totalCount = getObjTotalSums(newItem)['totalCount'];
            const totalPrice = getObjTotalSums(newItem)['totalPrice'];
            
            return { ...state, 
                items: newItem,
                totalCount,
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

            const oldItems = state.items[action.payload].items;
            
            if(oldItems.length > 1) {
                const newList = state.items[action.payload].items.slice(1);
                const newItem = {
                    ...state.items,
                    [action.payload]: {
                        items: newList,
                        totalPriceByPizza: getTotalPrice(newList)
                    }
                };

                const totalCount = getObjTotalSums(newItem)['totalCount'];
                const totalPrice = getObjTotalSums(newItem)['totalPrice'];
                
                return { ...state, 
                    items: newItem, 
                    totalCount,
                    totalPrice
                }

            }

            return state;

        }
        case (CONSTANTS.PLUS_ITEM): {
            const newObjItem = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ];

            const newItem = {
                ...state.items,
                [action.payload]: {
                    items: newObjItem,
                    totalPriceByPizza: getTotalPrice(newObjItem)
                }
            };

            const totalCount = getObjTotalSums(newItem)['totalCount'];
            const totalPrice = getObjTotalSums(newItem)['totalPrice'];
            
            return { ...state, 
                items: newItem, 
                totalCount,
                totalPrice
            };

        }
        default: return state;
    }
}

export default cart;