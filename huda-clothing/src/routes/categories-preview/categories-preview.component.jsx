import { Fragment } from "react";

import { useSelector } from "react-redux";

import { 
    selectCategoriesMap,
    selectCategoriesIsLoading 
} from "../../store/categories/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)

    return (
        // We need to first display the four categories inside of our categoriesMap ->
        // therefore we need a fragment for this component hierarchy

        // array of keys('title' field in categoriesMap)
        /* 
            note that {} is for multi-line return while
            () is for single-line explicity return 
        */
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]
                    return (
                        <CategoryPreview key={title} title={title} products={products}/>
                    )
                })
            )}
        </Fragment>
    );
};

export default CategoriesPreview;