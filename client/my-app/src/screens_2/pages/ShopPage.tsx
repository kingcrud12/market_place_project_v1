import React, { useState, useCallback } from 'react';
import './ShopPage.css';
import Navigation from './../components/Homepage/Navigation';
import BreadCrumb from './../components/Others/BreadCrumb';
import Footer from './../components/Homepage/Footer';
import CheckboxList from '../components/Others/CheckboxList';
import Watch from '../../assets_2/image/watch-apple.png';
import WatchSerie from '../../assets_2/image/watch-serie.png';
import Cart from '../../assets_2/image/ShoppingCartSimple.svg';
import ArrowOrange from '../../assets_2/image/Regular/ArrowRight.svg';
import { Category } from './../components/Homepage/CategoryPopups';
import GeneralProducts from '../components/Homepage/GeneralProducts';

import Drone from '../../assets_2/image/Drone.svg';
import PS5Image from '../../assets_2/image/Image_ps5.png';
import Tel2 from '../../assets_2/products/tel2.png';
import Manette4 from '../../assets_2/products/manette4.png';
import Ecouteur5 from '../../assets_2/products/ecouteur5.png';
import Portable6 from '../../assets_2/products/portable6.png';
import Drone7 from '../../assets_2/products/drone7.png';
import Pc8 from '../../assets_2/products/pc8.png';
import Webcam9 from '../../assets_2/products/webcam9.png';

const products = [
  {
      id: 1,
      name: "Xbox Series S - 512GB SSD Console with Wireless Controller - EU Versio...",
      price: 442.12,
      originalPrice: 865.99,
      discount: "32% OFF",
      rating: 5,
      reviews: 52677,
      isHot: true,
      isSoldOut: false,
      imageUrl: PS5Image,
      description: 'Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.',
      inStock: true,
    },
    
    {
      id: 2,
      name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
      rating:5,
      reviews: 567,
      price: 2300,  
      isHot: false,
      isSoldOut: true,
      imageUrl: Drone, 
    },

    {
      id: 3,
      name: "Simple Mobile 4G LTE Prepaid Smartphone",
      rating:5,
      reviews: 567,
      price: 220, 
      isSale: true,
      isSoldOut: false,
      imageUrl: Tel2, 
    },

    {
      id: 4,
      name: "4K UHD LED Smart TV with Chromecast Built-in",
      rating:5,
      reviews: 567,
      price: 150, 
      originalPrice: 865,
      discount: "19% OFF",
      isHot: false,
      isSoldOut: false,
      imageUrl: Manette4, 
    },

    {
      id: 5,
      name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
      rating:5,
      reviews: 567,
      price: 1200,  
      isBestDeal: true,
      isSoldOut: false,
      imageUrl: Ecouteur5, 
    },

    {
      id: 6,
      name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
      rating:5,
      reviews: 567,
      price: 299,  
      isHot: false,
      isSoldOut: false,
      imageUrl: Portable6, 
    },

    {
      id: 7,
      name: "Portable Wshing Machine, 11lbs capacity Model 18NMFIAM",
      rating:5,
      reviews: 567,
      price: 70,  
      originalPrice: 865.99,
      isHot: false,
      isSoldOut: false,
      imageUrl: Drone7, 
    },

    {
      id: 8,
      name: "2-Barrel Carburetor Carb 2100 Engine Increase Horsepower",
      rating:5,
      reviews: 567,
      price: 160,  
      isHot: true,
      isSoldOut: false,
      imageUrl: Pc8, 
    },

    {
      id: 9,
      name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
      rating:5,
      reviews: 567,
      price: 250,  
      isHot: false,
      discount: "32% OFF",
      isSoldOut: false,
      imageUrl: Webcam9, 
    },

    
    
    {
      id: 2,
      name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
      rating:5,
      reviews: 567,
      price: 2300,  
      isHot: false,
      isSoldOut: true,
      imageUrl: Drone, 
    },

    {
      id: 3,
      name: "Simple Mobile 4G LTE Prepaid Smartphone",
      rating:5,
      reviews: 567,
      price: 220, 
      isSale: true,
      isSoldOut: false,
      imageUrl: Tel2, 
    },

    {
      id: 4,
      name: "4K UHD LED Smart TV with Chromecast Built-in",
      rating:5,
      reviews: 567,
      price: 150, 
      originalPrice: 865,
      discount: "19% OFF",
      isHot: false,
      isSoldOut: false,
      imageUrl: Manette4, 
    },

    {
      id: 5,
      name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
      rating:5,
      reviews: 567,
      price: 1200,  
      isBestDeal: true,
      isSoldOut: false,
      imageUrl: Ecouteur5, 
    },

    {
      id: 6,
      name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
      rating:5,
      reviews: 567,
      price: 299,  
      isHot: false,
      isSoldOut: false,
      imageUrl: Portable6, 
    },

    {
      id: 7,
      name: "Portable Wshing Machine, 11lbs capacity Model 18NMFIAM",
      rating:5,
      reviews: 567,
      price: 70,  
      originalPrice: 865.99,
      isHot: false,
      isSoldOut: false,
      imageUrl: Drone7, 
    },

    {
      id: 8,
      name: "2-Barrel Carburetor Carb 2100 Engine Increase Horsepower",
      rating:5,
      reviews: 567,
      price: 160,  
      isHot: true,
      isSoldOut: false,
      imageUrl: Pc8, 
    },

    {
      id: 9,
      name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
      rating:5,
      reviews: 567,
      price: 250,  
      isHot: false,
      discount: "32% OFF",
      isSoldOut: false,
      imageUrl: Webcam9, 
    },

   
    
    {
      id: 2,
      name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
      rating:5,
      reviews: 567,
      price: 2300,  
      isHot: false,
      isSoldOut: true,
      imageUrl: Drone, 
    },

    {
      id: 3,
      name: "Simple Mobile 4G LTE Prepaid Smartphone",
      rating:5,
      reviews: 567,
      price: 220, 
      isSale: true,
      isSoldOut: false,
      imageUrl: Tel2, 
    },

    {
      id: 4,
      name: "4K UHD LED Smart TV with Chromecast Built-in",
      rating:5,
      reviews: 567,
      price: 150, 
      originalPrice: 865,
      discount: "19% OFF",
      isHot: false,
      isSoldOut: false,
      imageUrl: Manette4, 
    },

    {
      id: 5,
      name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
      rating:5,
      reviews: 567,
      price: 1200,  
      isBestDeal: true,
      isSoldOut: false,
      imageUrl: Ecouteur5, 
    },

    {
      id: 6,
      name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
      rating:5,
      reviews: 567,
      price: 299,  
      isHot: false,
      isSoldOut: false,
      imageUrl: Portable6, 
    },

    {
      id: 7,
      name: "Portable Wshing Machine, 11lbs capacity Model 18NMFIAM",
      rating:5,
      reviews: 567,
      price: 70,  
      originalPrice: 865.99,
      isHot: false,
      isSoldOut: false,
      imageUrl: Drone7, 
    },

    {
      id: 8,
      name: "2-Barrel Carburetor Carb 2100 Engine Increase Horsepower",
      rating:5,
      reviews: 567,
      price: 160,  
      isHot: true,
      isSoldOut: false,
      imageUrl: Pc8, 
    },

    {
      id: 9,
      name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
      rating:5,
      reviews: 567,
      price: 250,  
      isHot: false,
      discount: "32% OFF",
      isSoldOut: false,
      imageUrl: Webcam9, 
    },

    

  ];

const ShopPage: React.FC = () => {
  const categories: Category[] = [
    { id: 1, name: 'Computer & Laptop' },
    { id: 2, name: 'Computer Accessories' },
    { id: 3, name: 'Smartphone' },
    { id: 4, name: 'Headphones' },
    { id: 5, name: 'Mobile Accessories' },
    { id: 6, name: 'Gaming Console' },
    { id: 7, name: 'Camera & Photo' },
    { id: 8, name: 'TV & Homes Appliances' },
    { id: 9, name: 'Watches & Accessories' },
    { id: 10, name: 'GPS & Navigation' },
    { id: 11, name: 'Wearable Technology' },
  ];

  const priceOptions = [
    'All Price',
    'Under $20',
    '$25 to $100',
    '$100 to $300',
    '$300 to $500',
    '$500 to $1,000',
    '$1,000 to $10,000',
  ];

  
  // Gestion de l'état pour le slider
  const [selectedRange, setSelectedRange] = useState<string | null>(null);
  const [minValue, setMinValue] = useState<number>(0); // Valeur minimale
  const [maxValue, setMaxValue] = useState<number>(1000); // Valeur maximale
  const [minKnobPosition, setMinKnobPosition] = useState<number>(0); // Position du knob min (0%)
  const [maxKnobPosition, setMaxKnobPosition] = useState<number>(100); // Position du knob max (100%)
  const [draggingKnob, setDraggingKnob] = useState<"min" | "max" | null>(null); // Suivi du knob en cours de glissement



  // Fonction pour gérer le déplacement de la souris
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingKnob) return; // Pas de knob en cours de glissement
    
    const slider = document.querySelector('.slider-container') as HTMLElement;
    const rect = slider.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left; // Position du clic par rapport au slider
    const sliderWidth = rect.width;

    // Calcul de la nouvelle position en pourcentage
    const newPosition = Math.min(
      100,
      Math.max(0, (clickPosition / sliderWidth) * 100)
    );

    if (draggingKnob === 'min' && newPosition < maxKnobPosition) {
      setMinKnobPosition(newPosition);
      setMinValue(Math.round((newPosition / 100) * 1000)); // Ajuste la valeur min
    }

    if (draggingKnob === 'max' && newPosition > minKnobPosition) {
      setMaxKnobPosition(newPosition);
      setMaxValue(Math.round((newPosition / 100) * 1000)); // Ajuste la valeur max
    }
  },
  [draggingKnob, maxKnobPosition, minKnobPosition]
);

  // Fonction pour stopper le glissement
  const handleMouseUp = useCallback(() => {
    setDraggingKnob(null); // Réinitialise le knob glissé
  }, []);
 
  // Ajout des listeners globaux pour gérer le glissement même en dehors du slider
  React.useEffect(() => {
    if (draggingKnob) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingKnob, handleMouseMove, handleMouseUp]);

  const handleMouseDown = (knob: "min" | "max") => {
    setDraggingKnob(knob);
  };



  return (
    
    <div className="global-product-list">
      
      <Navigation />
      <BreadCrumb />
      
      <div className="product-list">
        <div className="filter-list">
          {/* Liste des catégories */}
          <div className="category-list">
          <span className="category-label">Category</span>
          <div className="radio">
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
          </div>
          
          <span className="diviser-shopage"></span>
          <div className="price-range">
            {/* Slider and price range */}
            <span className="category-label">Price Range</span>
            {/* Slider */}
            <div className="slider-container">
              <div className="slider-line"></div>

              {/* Ligne orange active entre les knobs */}
              <div
                 className="slider-active-line"
                 style={{
                 left: `${minKnobPosition}%`,
                 width: `${maxKnobPosition - minKnobPosition}%`,
               }}
              ></div>
              {/* Knobs */}
              <div
                className="slider-knob"
                draggable="false"
                style={{ left: `${minKnobPosition}%` }}
                onMouseDown={() => handleMouseDown('min')}
              ></div>
              <div
                className="slider-knob"
                draggable="false"
                style={{ left: `${maxKnobPosition}%` }}
                onMouseDown={() => handleMouseDown('max')}
              ></div>
            </div>
            {/* Inputs affichant les valeurs */}
            <div className="price-inputs">
              <input
                type="text"
                className="price-input"
                placeholder="Min price"
                value={`$${minValue}`}
                readOnly
              />
              <input
                type="text"
                className="price-input"
                placeholder="Max price"
                value={`$${maxValue}`}
                readOnly
              />
            </div>
            {/* Options prédéfinies */}
            <ul className="price-options">
              {priceOptions.map((option, index) => (
                <li key={index} className="price-option">
                  <label>
                    <input
                      type="radio"
                      name="price-range"
                      value={option}
                      checked={selectedRange === option}
                      onChange={() => setSelectedRange(option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
            <span className="diviser-shopage"></span>
            {/* Popular Brands */}
            <div className="price-range">
              <span className='category-label'>
              popular Brands
              </span>
              <div className='check-style'>
              <CheckboxList />
              </div>
            </div>
            <span className="diviser-shopage"></span>
            {/* Tags populaires */}
            <div className="price-range">
              <span className='category-label'>Popular Tag</span>
              <div className="footer-tags-shop">
                {[
                  "Game",
                  "iPhone",
                  "TV",
                  "Asus Laptops",
                  "Macbook",
                  "SSD",
                  "Graphics Card",
                  "Power Bank",
                  "Smart TV",
                  "Speaker",
                  "Tablet",
                  "Microwave",
                  "Samsung",
                ].map((tag) => (
                <button key={tag} className="footer-tag-shop">
                  {tag}
                </button>
              ))}
              </div>
            </div>
            {/* Banner*/}
            <div className='banner-shop'>
              <img src={Watch} alt='banner' />
              <div className='content-shopage'>
                <div className='sous-content-shopage'>
                <img src={WatchSerie} alt='banner' />
                <span className='text-shopage'>Heavy on Features.
                Light on Price.</span>
                </div>
                <div className='content-price-shopage'>
                 <span className='text-only'>Only for:</span>
                 <span className='price-only'>$299 USD</span>
                </div>
                </div>
                <div className='button-shopage'>
                <button className="add-to-cart-button-shopage">
                  <img src={Cart} alt='' />
                  ADD TO CART
                </button>
                <button className="view-detail-button">
                  
                  View Details
                  <img src={ArrowOrange} alt='' />
                </button>
                  </div>
            </div>
          </div>
        
        {/* Liste des produit */}
        <div className="other-featuredproduct">
                    {products.slice(1).map(product => (
                        <GeneralProducts key={product.id} product={product} />
                    ))}
            </div>
          </div>
      <Footer />
    </div>
  );
};

export default ShopPage;