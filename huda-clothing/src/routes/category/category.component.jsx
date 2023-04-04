import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState, Fragment} from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss'

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext)
    /* We want to extract the products from categoriesMap based on the category passed from the url */
    const [products, setProducts] = useState(categoriesMap[category])
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
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
        </Fragment>
    )
}

export default Category;