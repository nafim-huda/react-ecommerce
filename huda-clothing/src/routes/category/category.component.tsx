import { useParams } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';

import {
    selectCategoriesMap,
    selectCategoriesIsLoading
} from '../../store/categories/category.selector';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import './category.styles.scss'

/* 
    Problem: 
        Our category from useParams() is giving the TS compiler an issue, because it 
        does not know whether or not we will actually receive the "category" url from the array
        of urls inside of useParams() -> therefore our category could be undefined even though we know
        to reach this functional component's render, we must have matched "/category" inside of our shop component's
        routes

    Solution:
        define a CategoryRouteParams type and have our useParams only accept the
         keys of our route params obj as well as cast it as a string of the 
         CategoryRouteParams type
*/

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const { category } = useParams
        <keyof CategoryRouteParams>() as CategoryRouteParams;
    const isLoading = useSelector(selectCategoriesIsLoading)
    const categoriesMap = useSelector(selectCategoriesMap)
    /* We want to extract the products from categoriesMap based on the category passed from the url */
    const [products, setProducts] = useState(categoriesMap[category])


    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className='category-container'>
                    {
                        /* Safeguard:
                            products && will check for existence(non-undefined value)
                            of products before attempting to render the following products.map()
                        */
                        products &&
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>
                )}
        </Fragment>
    )
}

export default Category;