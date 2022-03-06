import { combineReducers } from 'redux'
import * as types from './types'

const reportReducer = (state = [], { type, payload }) => {
    switch (type) {
        case types.LOAD:
            return payload;
        case types.RESET:
            return null;
        default:
            return state;
    }
}

const reducers = {
  orderArray: reportReducer
};

export default combineReducers(reducers)