import * as CONSTANTS from './actionTypes';

export const addToCart = item => ({
    type: CONSTANTS.ADD_ITEM_TO_CART,
    payload: item
});
export const clearCart = itemFilter => ({
    type: CONSTANTS.CLEAR_CART,
    payload: itemFilter
});