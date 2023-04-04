import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)
    return (
        // We need to first display the four categories inside of our categoriesMap ->
        // therefore we need a fragment for this component hierarchy

        // array of keys('title' field in categoriesMap)
        /* 
            note that {} is for multi-line return while
            () is for single-line explicity return 
        */
        <Fragment>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title]
                return (
                    <CategoryPreview key={title} title={title} products={products}/>
                )
            })};
        </Fragment>
    );
};

export default CategoriesPreview;