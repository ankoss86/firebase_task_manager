import * as actionTypes from './types';

export const signInUser = user => {
    return {
        type: actionTypes.SIGN_IN_USER,
        payload: {
            signedUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}