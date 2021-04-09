import * as CONSTANTS from './actionTypes';

export const setSortBy = name => ({
    type: CONSTANTS.SET_SORT_BY,
    payload: name
});
export const setCategory = catIndex => ({
    type: CONSTANTS.SET_CATEGORY,
    payload: catIndex
});