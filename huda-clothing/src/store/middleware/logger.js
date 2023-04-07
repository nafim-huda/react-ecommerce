export const loggerMiddleWare = (store) => (next) => (action) => {
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
