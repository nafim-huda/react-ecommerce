import { AnyAction } from "redux";
import { Category } from "./category.types";

import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed} from "./category.action";

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}


export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null // reducer need to be aware of error occuring in async function
}

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE,
    // 'as' keyword in this context leads to a discriminatory union 
    action = {} as AnyAction
    ) : CategoriesState => {
        if(fetchCategoriesStart.match(action)) {
            return {...state, isLoading: true};
        }
        if(fetchCategoriesSuccess.match(action)) {
            return {...state, categories: action.payload, isLoading: false};
        }
        if(fetchCategoriesFailed.match(action)) {
            return {...state, error: action.payload, isLoading: false}
        }
        return state;
    } 

    /* 
        Problem: 
            Note that there is a major design issue with using discriminatory unions
            in the context of matching action types inside of our reducer -> the
            reducer will assume that all of the types specified in the discriminatory union
            will have a coressponding case defined in the reducer's switch block... this could
            lead to issues if we forget to match one of the types as we scale our application

        Solution:
            Type Predicates that will extend our action creators to perform type checking against
            the action they hold
            
            Implementation:
                .match()
    */