import * as CONSTANTS from './actionTypes';

export const setPizzas = pizzas => ({
    type: CONSTANTS.SET_PIZZAS,
    payload: pizzas
});