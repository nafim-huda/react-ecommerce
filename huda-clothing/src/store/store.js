import { configureStore } from '@reduxjs/toolkit';
// import { compose, createStore, applyMiddleware} from 'redux'
 import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

export const store = configureStore({
    reducer: rootReducer,
    // returns default middlewares + concatenated with our own middleWares[]
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(middleWares),
})