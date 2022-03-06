import * as types from './types'

export const loadData = (orderArray) => (dispatch) => {
    dispatch({
        type: types.LOAD,
        payload: orderArray
    });
}