import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    categories: [],
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState: INITIAL_STATE,
    reducers: {
        // define action types and action creator functions associated with the action types
        setCategories(state, action) {
            state.categories = action.payload;
        }
    }
})

// strip off the action creator function to dispatch in the shop component
export const { setCategories } = categorySlice.actions;

// strip off the reducer to pass into our root reducer
export const categoriesReducer = categorySlice.reducer;