import { compose, configureStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

/* 
    this store.js file 
    centralizes where we receive actions and dispatch them out to update state 

*/

// middlewares let us intercept an action before it hits a reducer and perform some actions
const middleWares = [logger]

// compose() lets us pass in multiple functions from left to right
const composedEnhancers = compose(applyMiddleware(...middleWares));

// root-reducer 

// loggers allow us to see the state before an action is dispatch
// , the state after an action is dispatched
export const store = configureStore(
    rootReducer,
    undefined, // initial state
    composedEnhancers 
)
