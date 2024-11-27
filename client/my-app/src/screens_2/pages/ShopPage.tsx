import React from 'react';
import './ShopPage.css';
import Navigation from './../components/Homepage/Navigation';
import BreadCrumb from './../components/Others/BreadCrumb';
import Footer from './../components/Homepage/Footer';
import  { Category } from './../components/Homepage/CategoryPopups';

const ShopPage: React.FC = () => {

    const categories: Category[] = [
        { id: 1, name: 'Computer & Laptop' },
        { id: 2, name: 'Computer Accessories' },
        { id: 3, name: 'Smartphone'},
        { id: 4, name: 'Headphones' },
        { id: 5, name: 'Mobile Accessories' },
        { id: 6, name: 'Gaming Console' },
        { id: 7, name: 'Camera & Photo' },
        { id: 8, name: 'TV & Homes Appliances' },
        { id: 9, name: 'Watchs & Accessories' },
        { id: 10, name: 'GPS & Navigation' },
        { id: 11, name: 'Warable Technology' },
      ];


return (
    <div className="global-product-list">
      <Navigation />
      <BreadCrumb />
      <div className="product-list">
        <div className="category-list">
            <span className='category-label'>Category</span>
            <div className='radio'>
            {/* Liste des catégories */}
            <ul className="categories-shopage">
              {categories.map((category) => (
                <li key={category.id} className="category-item-shopage">
                  <label className="label-shopage">
                    <input type="radio" name="category" value={category.id} />
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>

            </div>
            <span className="diviser-shopage"></span>
            <div className="price-range">
                <span className="category-label">Price Range</span>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;