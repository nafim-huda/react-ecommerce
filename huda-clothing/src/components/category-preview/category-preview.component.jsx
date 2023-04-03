import './category-preview.styles.scss'

import { Link } from 'react-router-dom'

import ProductCard from '../product-card/product-card.component';
/* lives at the shop component level -> 
renders a preview page that displays the first four titems for each unique 
category
*/ 
const CategoryPreview = ({ title, products }) => {
    return (
        <div className='category-preview-container'>
            <h2>
                <Link className='title' to={title}
                    >{title.toUpperCase()}
                </Link>
            </h2>
            <div className='preview'>
                { // _ in filter() means ignore this argument
                    products
                        .filter((_,idx) => idx < 4)
                        .map((product) => (
                        <ProductCard key={product.id} product={product} />
                ))}
            </div>

        </div>
    )
}

export default CategoryPreview;