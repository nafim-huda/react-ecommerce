export const selectCategoriesMap = (state) => state.categories.categories
.reduce((acc, category) => {
    // destructure values off of the document
    const { title, items } = category
    acc[title.toLowerCase()] = items;
    return acc;
}, {});
;
