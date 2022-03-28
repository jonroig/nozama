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
};

const amznReducer = (state = [], { type, payload }) => {
    switch (type) {
        case types.AMZNLOAD:
            return payload;
        default:
            return state;
    }
};


const reducers = {
    orderArray: reportReducer,
    amznArray: amznReducer
};

export default combineReducers(reducers)