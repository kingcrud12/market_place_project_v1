import React, { useState } from 'react';
import Navigation from './Navigation';
import CardProduct from './CardProduct';
import Xbox from '../../../assets_2/image/Image_xbox.svg'
import IconPackage from '../../../assets_2/icons/Duotone/Package.svg'
import Trophy from '../../../assets_2/icons/Duotone/Trophy.svg'
import CreditCard from '../../../assets_2/icons/Duotone/CreditCard.svg'
import HeadPhone from '../../../assets_2/icons/Duotone/Headphones.svg'
import './Header.css';

interface Product {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  imageUrl: string;
}

const Header: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<number>(0);

  const products: Product[] = [
    {
      title: "Xbox Consoles",
      subtitle: "THE BEST PLACE TO PLAY",
      description: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
      price: "$299",
      imageUrl: Xbox
    },
    {
      title: "New Google Pixel 6 Pro",
      subtitle: "SUMMER SALES",
      description: "Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
      price: "$299",
      imageUrl: Xbox
    },
    {
      title: "Xiaomi FlipBuds Pro",
      subtitle: "yes aie",
      description:"Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.",
      price: "$299",
      imageUrl: Xbox
    },
  ];

  const handleDotClick = (index: number) => {
    setCurrentCard(index);
  };

  const handleButtonClick = () => {
    console.log('Shop Now button cliked')
  };


  return (
    <header className="header">   
      {/* Barre de la navigation */}
      <Navigation />

       {/* Section des produits */}
       <div className="header-widgets">
        <CardProduct
          title={products[currentCard].title}
          subtitle={products[currentCard].subtitle}
          description={products[currentCard].description}
          price={products[currentCard].price}
          imageUrl={products[currentCard].imageUrl}
          currentCard={currentCard}
          totalCards={products.length}
          onDotClick={handleDotClick}
          onButtonClick={handleButtonClick}
        />
        </div>
        <div className='bar-widget'>
          
          <div className='feature-un'>
            <img src={IconPackage} alt='icon-package' className='icon-package' />
            <div className= 'text-feature'>
              <span className='text-up'>Fasted Delivery</span>
              <span className='text-down'>Delivery in 24/H</span>
            </div>
          </div>
          <span className= 'line-feature'></span>

           <div className='feature-un'>
            <img src={Trophy} alt='Trophy' className='icon-package' />
            <div className= 'text-feature'>
              <span className='text-up'>24 Hours Return</span>
              <span className='text-down'>100% money-back guarantee</span>
            </div>
          </div>
          <span className= 'line-feature'></span>

           <div className='feature-un'>
            <img src={CreditCard} alt='CreditCard' className='icon-package' />
            <div className= 'text-feature'>
              <span className='text-up'>Secure Payment</span>
              <span className='text-down'>Your money is safe</span>
            </div>
          </div>
          <span className= 'line-feature'></span>

           <div className='feature-un'>
            <img src={HeadPhone} alt='icon-HeadPhone' className='icon-package' />
            <div className= 'text-feature'>
              <span className='text-up'>Support 24/7</span>
              <span className='text-down'>Live contact/message</span>
            </div>
          </div> 
      
        </div>
    </header>
  );
};

export default Header; 