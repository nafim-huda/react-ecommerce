import { AnyAction } from "redux";

/* Matchable Function:
    - will perform a intersection with incoming action to identify its type
    - will match the incoming action's type using a type predicate 
*/

type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
}


// withMatcher() for an action creator with no parameters
export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

// withMatcher() for an action creator that can receive any number of arguments
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

// takes an actionCreator function and determines whether the incoming action 
// has the same type as the action they are attempting to create
export function withMatcher(actionCreator: Function ) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type; 
        }
    })
}

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
}

export type Action<T> = {
    type: T;
}

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T,P>

export function createAction<T extends string>(type: T, payload: void): Action<T>

export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload };
}


/* 

Function Overloading is needed for a createAction that depends on the payload 
    NOTE:
        we need the same number of arguments inside of our function's type definition
        -> payload: void must be included in the overloaded version of createAction

Type Predicates:
    - a function used to verify a type for an object
    ex.)
        type Alien = {
            fly: () => {}
        }
        type Human = {
            speak: () => {}
        }
        // Type Predicate
        function isHuman(entity: Human | Alien) : entity is Human {
            return (entity as Human).speak === undefined;
        }

Intersection Type:
    ex.)
        type Alien = {
            fly: () => void
        }

        type Human = {
            name: string;
        }
        type Hybrid = Human & Alien;
        
        const Josh: Hybrid: {
            name: 'josh',
            fly: () => {}
        }
Return Type:
    ex.)
        type MyFunc = () => string
        type MyReturn = ReturnType<MyFunc> // returns string
*/
