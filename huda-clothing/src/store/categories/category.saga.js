import { takeLatest, all, call, put } from 'redux-saga/effects'

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
 
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';

/* 
    instead of async-await pattern, we will use yield-call pattern since we now
    utilizing sagas to handle asynchronous state managment
    also, we will replace our dispatch() calls with yield-put calls() for our 
    action creator functions
*/


export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments);
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    // whenever we take the latest FETCH_CATEGORIES_START action -> fetchCategoriesAsync
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    // all() will execute everything contained within the array args of functions
    yield all([call(onFetchCategories)])
    // everything below all() will not be called until all() finishes executing
}