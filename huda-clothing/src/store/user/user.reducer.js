import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,

}
// must define state prop since we have no more useReducer() hook defining state for our reducer
export const userReducer = (
    state = INITIAL_STATE,
    action = {}
) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload };
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {...state, currentUser: null};
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return { ...state, error: payload };
        default:
            // in redux, we need to return the state(since every reducer will receive all actions -> a reducer will
            // likely not respond to every action -> therefore we will not throw an error and instead return state)
            return state;
    }
}

