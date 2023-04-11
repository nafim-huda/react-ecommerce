import { CATEGORIES_ACTION_TYPES, Category, CategoryItem} from "./category.types";

import { 
    createAction,
     Action, 
     ActionWithPayload,
    withMatcher
    } from "../../utils/reducer/reducer.utils";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

// tells our redux store that we are fetching categories from Firebase
export const fetchCategoriesStart = withMatcher(
    (): FetchCategoriesStart =>
        createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
    );

export const fetchCategoriesSuccess = withMatcher((
    categoriesArray: Category[]
    ): FetchCategoriesSuccess =>
        createAction(
            CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
            categoriesArray
        )
    );

export const fetchCategoriesFailed = withMatcher(
    (error: Error): FetchCategoriesFailed =>
        createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
    );

