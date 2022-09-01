import * as CONSTANTS from './actionTypes';

export const addToCart = pizzaObj => ({
    type: CONSTANTS.ADD_ITEM_TO_CART,
    payload: pizzaObj
});
export const clearCart = () => ({
    type: CONSTANTS.CLEAR_CART
});
export const removeCartItem = id => ({
    type: CONSTANTS.REMOVE_ITEM_FROM_CART,
    payload: id
});
export const minusItem = pizzaObj => ({
    type: CONSTANTS.MINUS_ITEM,
    payload: pizzaObj
});
export const plusItem = pizzaObj => ({
    type: CONSTANTS.PLUS_ITEM,
    payload: pizzaObj
});