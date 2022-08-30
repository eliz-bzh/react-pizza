import * as CONSTANTS from './actionTypes';

export const addToCart = pizzaObj => ({
    type: CONSTANTS.ADD_ITEM_TO_CART,
    payload: pizzaObj
});
export const clearCart = itemFilter => ({
    type: CONSTANTS.CLEAR_CART,
    payload: itemFilter
});