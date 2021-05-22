import * as CONSTANTS from './actionTypes';
import axios from 'axios';

export const fetchPizzas = ({ order, type }, category) => (dispatch) => {
    dispatch(setLoad(false))
    axios.get(`http://localhost:3001/pizzas?${category != null ? `category=${category}&` : ''}_order=${order}&_sort=${type}`)
        .then(({ data }) => {
            dispatch(setPizzas(data));
        })
}

export const setPizzas = pizzas => ({
    type: CONSTANTS.SET_PIZZAS,
    payload: pizzas
});

export const setLoad = loader => ({
    type: CONSTANTS.SET_LOADER,
    payload: loader
});