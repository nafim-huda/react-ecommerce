import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}
// must define state prop since we have no more useReducer() hook defining state for our reducer
export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload }
        default:
            // in redux, we need to return the state(since every reducer will receive all actions -> a reducer will
            // likely not respond to every action -> therefore we will not throw an error and instead return state)
            return state;
    }
}

