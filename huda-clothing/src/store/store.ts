import { compose, createStore, applyMiddleware, Middleware} from 'redux'
import { persistStore, persistReducer, PersistConfig} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer'

export type RootState = ReturnType<typeof rootReducer>

// extend our window object
declare global {
    interface Window {
        // ? says this is an optional key 
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose 
    }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig : ExtendedPersistConfig = {
    key: 'root',
    storage, // localStorage by default
    whitelist: ['cart'], // strings that represent reducers that we DO want to persist
}

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer)

// middlewares let us intercept an action before it hits a reducer and perform some actions
// only render the logger if we are in development env -> 
const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleWare,
    // Typescript does not know that depending on the truthiness of our middlewares, we will have a middleware narrowed down 
].filter((middleware): middleware is Middleware => Boolean(middleware));
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

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
