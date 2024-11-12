import React, { useRef } from 'react';
import LeftArrowIcon from '../../../assets_2/icons/Regular/ArrowLeft.svg';
import RightArrowIcon from '../../../assets_2/icons/Regular/Regular/ArrowRight.svg';
import Computer from '../../../assets_2/products/category_computer.png';
import SmartPhone from '../../../assets_2/products/category_smartphone.png';
import HeadPhone from '../../../assets_2/products/category_headphone.png';
import Accessories from '../../../assets_2/products/category_accessories.png';
import Camera from '../../../assets_2/products/category_camera.png';
import Ecran from '../../../assets_2/products/category_ecran.png';
import './Category.css';

function Category () {
    // liste catégories avec images et noms
    const categories = [
        {name: 'Computer & Laptop', imageUrl: Computer},
        {name: 'SmartPhone', imageUrl: SmartPhone},
        {name: 'Headphones', imageUrl: HeadPhone},
        {name: 'Accessories', imageUrl: Accessories},
        {name: 'Camera & Photo', imageUrl: Camera},
        {name: 'Tv & Homes', imageUrl: Ecran},
        {name: 'Tv & Homes', imageUrl: Ecran},
        {name: 'Tv & Homes', imageUrl: Ecran},
            
    ];

    const categoryContainerRef = useRef<HTMLDivElement>(null);

    const handleScrollLeft = () => {
        if (categoryContainerRef.current) {
            categoryContainerRef.current.scrollLeft -= 200; // Ajustez la valeur pour définir la quantité de défilement
          }
    };

    const handleScrollRight = () => {
        if (categoryContainerRef.current) {
            categoryContainerRef.current.scrollLeft += 200; 
          }
      };
  return (

  <div className='category-value'>
    <span className='title-category'>Shop with Categorys</span>
    
    <div className= 'category-container'>
        <div className = 'button-category'>
            <button className= 'scroll-button left' onClick={handleScrollLeft}>
                <img src={LeftArrowIcon} alt='left Arrow' />
            </button>
            <button className= 'scroll-button right' onClick={handleScrollRight}>
                <img src={RightArrowIcon} alt='Right Arrow' />
            </button>
        </div>
       <div className='category' ref={categoryContainerRef}>
            {categories.map((category, index) => (
                <div key={index} className='category-item'>
                    <img src={category.imageUrl} alt={category.name} className='category-image' />
                    <span className='category-name'>{category.name}</span>
                </div>
            ))}
             
        </div>

    </div>
    
  </div>

  

  );
};

export default Category;
