import './directory.styles.scss';
import CategoryItem from '../category-item/category-item.component';

const Directory = ({categories}) => {
    return (
        // style - lets us apply a custom style to an attribute in our div
        // string interpolation - lets us inject a string variable within a string 
        <div className='directory-container'>
        {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))};
      </div>
    )
}

export default Directory;