import { compose, createStore, applyMiddleware} from 'redux'
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

/* 
    this store.js file 
    centralizes where we receive actions and dispatch them out to update state 

*/

const persistConfig = {
    key: 'root',
    storage, // localStorage by default
    blackList: ['user'], // strings that represent reducers that we DO NOT want to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// middlewares let us intercept an action before it hits a reducer and perform some actions
// only render the logger if we are in development env -> 
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
    Boolean
);
// if we are not in production, there is a window object, and dev tools extension exists -> use this compose
const composeEnhancer
 = (process.env.NODE_ENV !== 'production' && 
        window && 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

// compose() lets us pass in multiple functions from left to right
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// root-reducer 

// loggers allow us to see the state before an action is dispatch
// , the state after an action is dispatched
export const store = createStore(
    persistedReducer,
    {}, // initial state
    composedEnhancers 
)

export const persistor = persistStore(store);
