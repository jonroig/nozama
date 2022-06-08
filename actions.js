import * as types from './types'

export const loadData = (orderObj) => (dispatch) => {
    dispatch({
        type: types.LOAD,
        payload: orderObj
    });
};

export const loadAmzn = (amznData) => (dispatch) => {
    dispatch({
        type: types.AMZNLOAD,
        payload: amznData
    });
}

export const reset = () => (dispatch) => {
    dispatch({
        type: types.RESET,
        payload: null
    });
}

export const updateFilter = (filterObj) => (dispatch) => {
    dispatch({
        type: types.FILTERCHANGE,
        payload: filterObj
    });
}