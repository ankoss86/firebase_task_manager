import * as actionTypes from '../actions/types';
import { combineReducers } from 'redux';

const initialUsersState = {
    signedUser: null,
    isLoading: true
};

const signUser = (state = initialUsersState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN_USER:            
            return {
                signedUser: action.payload.signedUser,
                isLoading: false
            }; 
        case actionTypes.CLEAR_USER:
            return {
                signedUser: null,
                isLoading: false
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    signedUser: signUser
});

export default rootReducer;