import * as types from './types'

export const loadData = (orderArray) => (dispatch) => {
    dispatch({
        type: types.LOAD,
        payload: orderArray
    });
};

export const loadAmzn = (amznData) => (dispatch) => {
    console.log('amznData', amznData);
    dispatch({
        type: types.AMZNLOAD,
        payload: amznData
    });
}