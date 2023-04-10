import { createSelector } from 'reselect'

// returns our category reducer
const selectCategoryReducer = (state) => state.categories;

// createSelect() : 
// creates a memoized selector to store previous out
export const selectCategories = createSelector(
    // first arg: input selector 
    [selectCategoryReducer],
    // second arg: output selector that takes the argument from the input selector
    (categoriesSlice) => categoriesSlice.categories
)

/* Memoized Selector for our categoriesArray */
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc, category) => {
            // destructure values off of the document
            const { title, items } = category
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);


/* 

export const selectCategoriesMap = (state) => state.categories.categories
.reduce((acc, category) => {
   // destructure values off of the document
   const { title, items } = category
   acc[title.toLowerCase()] = items;
   return acc;
}, {});
;

Problem:
       poor code composition -> the second arg, empty array {},  inside of a useEffect() tells our useSelect()
       that we are always returning back a new object(acc) -> unable to cache that value 
       , therfore all components with this selectCategoriesMap selector will be 
       re-rendered regardless of the returned object being the same value as the previous object
   Solution:
       createSelector() from the 'reselect' library

*/