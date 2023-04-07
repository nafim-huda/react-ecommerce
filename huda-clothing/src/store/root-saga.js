import { all, call } from 'redux-saga/effects'

import { categoriesSaga } from './categories/category.saga'

/* Sagas are based off of JS generator functions

    Generator Functions:
        - useful for controlling the execution of statements(letting
            us control execution flow with 'yield' keywords followed
            by business logic)
        syntax: function* function_name
        ex.) function * gen(i) {
            yield i;
            yield i + 10;
            return 25;
        }
        const g = gen(5)
        // returns undefined
        const gObj = g.next()
        // returns undefined
        gObj
        // returns {value: 5, done: false}
        const jObj g.next()
        // undefined
        jObj
        {value: 15, done: false}
        g.next()
        {value: 25, done: true}

*/

export function* rootSaga() {
    yield all([call(categoriesSaga)])
}