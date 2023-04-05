import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';

export const rootReducer = combineReducers({
    // key: name of reducer slice
    // value: reducer function
    user: userReducer,
    categories: categoriesReducer
});