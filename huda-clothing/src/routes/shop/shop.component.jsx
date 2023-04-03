import { Routes, Route } from 'react-router-dom'

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import '../shop/shop.styles.scss'

const Shop = () => {
    return (
        /*
            We need to first display the four categories inside of our categoriesMap ->
            therefore we need a fragment for this component hierarchy

            array of keys('title' field in categoriesMap)
            
            note that {} is for multi-line return while
            () is for single-line explicity return 


            The <Routes> component is needed for any parent route(in this case our shop component
            is a parent route)

            Inside of our path attribute, we want to match a unique string
            that will look for a parameter(category) from a component
            syntax follow :_paramName_
        */

        
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;