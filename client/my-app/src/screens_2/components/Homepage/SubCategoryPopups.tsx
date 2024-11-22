import React from "react";
import { Section } from "../../../screens_2/components/Homepage/ProductGrid"; 
import ArrowRightWhite from '../../../assets_2/icons/Regular/Regular/ArrowRight.svg';
import SmartBanner from '../../../assets_2/image/bannersmart.png'
import "./SubCategoryPopups.css";

interface SubCategory {
  id: number;
  name: string;
}

interface SubCategoryPopupsProps {
  subcategories: SubCategory[];
  featuredSection: Section; // Section contenant les produits en vedette
}

const SubCategoryPopups: React.FC<SubCategoryPopupsProps> = ({
  subcategories,
  featuredSection,
}) => {
  return (
    
    <div className="subcategory-popups">
      {/* Sous-catégories */}
      <div className="subcategory-list">
        <ul>
          {subcategories.map((subcategory) => (
            <li key={subcategory.id} className="subcategory-item">
              {subcategory.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Produits en vedette */}
      <div className="featured-section-popup">
        <span className="featured-title-popup">{featuredSection.title}</span>
        <ul className="product-list-popup">
          {featuredSection.products.map((product) => (
            <li key={product.id} className="product-item-popup">
              <img src={product.image} alt={product.name} className="product-image-popup" />
              <div className="product-info-popup">
                <span className="product-name-popup">{product.name}</span>
                <span className="product-price-popup">{product.price}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bannière */}
      <div className= 'first-banner-computer-popup'>
            <div className= 'first-content-computer'>
              <img src={SmartBanner} alt='' className='image-compbuds' />
              <div className='first-second-content'>
                <span className='title-firts-banner-computer'>
                21% Discount
                </span>
                <span className='subtitle-firts-banner-computer'>
                Escape the noise, It’s time to hear the magic with Xiaomi Earbuds.
                </span>
              </div>
              <div className='computer-banner-price'>
                <span className='computer-name-price'>
                Only for:
                </span>
                <span className='computer-badge-price'>
                $99 USD
                </span>

              </div>
            </div>
            <button className= 'button-first-computer'>
              Shop now
              <img src={ArrowRightWhite} alt='' />
              </button>

          </div>
    </div>
  );
};

export default SubCategoryPopups;