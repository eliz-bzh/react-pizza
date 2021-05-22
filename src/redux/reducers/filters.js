import * as CONSTANTS from '../actions/actionTypes';

const initialState = {
    category: null,
    sortBy: {
        type: 'rating',
        order: 'asc'
    }
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case (CONSTANTS.SET_SORT_BY): {
            return { ...state, sortBy: action.payload };
        }
        case (CONSTANTS.SET_CATEGORY): {
            return { ...state, category: action.payload };
        }
        default: return state;
    }
}

export default filters;