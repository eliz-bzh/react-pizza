import * as CONSTANTS from './actionTypes';

export const setSortBy = ({ type, order }) => ({
    type: CONSTANTS.SET_SORT_BY,
    payload: { type, order }
});
export const setCategory = catIndex => ({
    type: CONSTANTS.SET_CATEGORY,
    payload: catIndex
});