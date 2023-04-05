import { createAction } from "../../utils/reducer/reducer.utils"

import { USER_ACTION_TYPES } from "./user.types"

// action-creator function that dispatches a set user action type with the user we want to set as the payload
 export const setCurrentUser = (user) => {
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
}