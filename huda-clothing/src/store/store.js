import { compose, createStore, applyMiddleware} from 'redux'
// import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

/* 
    this store.js file 
    centralizes where we receive actions and dispatch them out to update state 

*/

const loggerMiddleWare = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action);
    }
    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentState', store.getState());

    // How do we derive the next state for our store(after actions
    // get passed to all of our reducers and they in turn update 
    // our state)?

    next(action);

    console.log('next state: ' + store.getState());
}

// middlewares let us intercept an action before it hits a reducer and perform some actions
const middleWares = [loggerMiddleWare]

// compose() lets us pass in multiple functions from left to right
const composedEnhancers = compose(applyMiddleware(...middleWares));

// root-reducer 

// loggers allow us to see the state before an action is dispatch
// , the state after an action is dispatched
export const store = createStore(
    rootReducer,
    {}, // initial state
    composedEnhancers 
)
