import * as types from './types'

export const loadData = (orderArray) => (dispatch) => {
    dispatch({
        type: types.LOAD,
        payload: orderArray
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