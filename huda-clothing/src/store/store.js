import { configureStore } from '@reduxjs/toolkit';
// import { compose, createStore, applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
 import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // returns default middlewares + concatenated with our own middleWares[]
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(middleWares),
})

export const persistor = persistStore(store)