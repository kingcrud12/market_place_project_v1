import React from 'react';
import './Navigation.css';
import Twitter from '../../../assets_2/icons/Twitter.svg';
import Facebook from '../../../assets_2/icons/Facebook.svg'
import Pinterest  from '../../../assets_2/icons/Pinterest.svg'
import Reddit from '../../../assets_2/icons/Reddit.svg'
import Youtube from '../../../assets_2/icons/Youtube.svg'
import Instagram from '../../../assets_2/icons/Instagram.svg'
import Carret from '../../../assets_2/icons/Regular/Multi-Currency/Regular/CaretDown.svg'
import LogoClicon from '../../../assets_2/branding/Icon3.svg'
import SearchIcon from '../../../assets_2/icons/Regular/MagnifyingGlass.svg'
import Cart from '../../../assets_2/icons/Vector.svg'
import Heart from '../../../assets_2/animations/Heart.svg'
import User from '../../../assets_2/icons/Regular/User.svg'
import CategoryIcon from '../../../assets_2/icons/Regular/CaretDown.svg'
import TrackIcon from '../../../assets_2/icons/Regular/MapPinLine.svg'
import DoubleArrows from '../../../assets_2/icons/Duotone/ArrowsCounterClockwise.svg'
import HeadPhones from '../../../assets_2/icons/Regular/Headphones.svg'
import Help from '../../../assets_2/icons/Regular/Info.svg'
import Phone from '../../../assets_2/icons/Regular/PhoneCall.svg'
import Vectorpoint from '../../../assets_2/icons/Vectorpoint.svg'

function Navigation ()  {

  const handleSearch = () => {
    console.log("Icône de recherche cliquée !");
  };
  
  return (
    <div className="navigation">
      {/* Section supérieure */}
      <div className="top-nav">
        {/* Contenu du TopNav */}
        <span className= 'welcome-text'>Welcome to Clicon online eCommerce store.</span>
        
        <div className= 'navigation-box'>
          
          <div className= 'reseau-box'>
            <span className= 'follow-text'>Follow us:</span>
            
            <a href='https://x.com/' target='_blank' rel='noopener noreferrer'>
            <img src={Twitter} alt= 'X ex Twitter' className= 'icon-twitter' />
            </a>
            
            <a href='https://facebook.com/' target='_blank' rel='noopener noreferrer'>
            <img src={Facebook} alt='icone de facebook' className='icon-facebook' />
            </a>
            
            <a href='https://pinterest.com/' target='_blank' rel='noopener noreferrer'>
            <img src={Pinterest} alt='icone de pinterest' className='icon-pinterest' />
            </a>
            
            <a href='https://reddit.com/' target='_blank' rel='noopener noreferrer'>
            <img src={Reddit} alt='icone de Reddit' className='icon-reddit' />
            </a>
            
            <a href='https://youtube.com/' target='_blank' rel='noopener noreferrer'>
            <img src={Youtube} alt='icone de Youtube' className='icon-youtube' />
            </a>
            
            <a href='https://instagram.com/' target='_blank' rel='noopener noreferrer'>
            <img src={Instagram} alt='icone de Instagram' className='icon-instagram' />
            </a>
            
          </div>
        
        <span className= 'barre'></span>
        
        <span className= 'global-eng'>
          <span className='eng-text'>Eng</span>
          <img src={Carret} alt= 'rowdown' className='rowDown' />
        </span>

        <span className='global-usd'>
          <span className= 'usd-txt'>USD</span>
          <img src={Carret} alt= 'rowdown' className='rowDown' />
        </span>

        </div>
      
      </div>

      {/* Section centrale */}
      <div className="middle-nav">
        {/* éléments de navigation principaux */}
        <div className= 'clicon'>
          <img src={LogoClicon} alt= 'logorond' className='logo-clicon' />
          <span className='clicon-text'>CLICON</span>
        </div>

        <div className= 'search'>
          <input type="text" placeholder='Search for anything...' className='input-search' />
          <button onClick={handleSearch} className="search-button" aria-label="Search">
            <img src={SearchIcon} alt='Search' className= 'search-icon' />
          </button>
        </div>

        <div className= 'icon-nav'>
          
          <div className='iconCart'>
            <img src={Cart} alt='cart' className= 'cart-icon' />
            <img src={Vectorpoint} alt='cart' className= 'point-1'/>
            <img src={Vectorpoint} alt= 'cart' className= 'point-2'/>
              <span className='text-cart'>2</span>
            </div>
          
          <img src={Heart} alt='Heart' className= 'heart-icon' />
          <img src={User} alt='User' className= 'user-icon' />
        
        </div>
      
      </div>

      {/* Section inférieure */}
      <div className="bottom-nav">
         {/* Contenu de BottomNav, comme les liens supplémentaires ou offres spéciales */}
         <div className='category-nav'>
          <button  className='category-button'>
            <span className= 'category-text'>All Category</span>
            <img src={CategoryIcon} alt="buttoncategory" className='icon-category'/>
            </button>
            <a href='https://www.google.fr/' className='nav-order' target='_blank' rel='noopener noreferrer'>
            <img src={TrackIcon} alt='track order' className='img-nav'/>
            <span className= 'track-order'>Track Order</span>
            </a>
            <a href='https://www.google.fr/' className='nav-compare' target='_blank' rel='noopener noreferrer'>
            <img src={DoubleArrows} alt='compare' className='img-nav'/>
            <span className='compare'>Compare</span>
            </a>
            <a href='https://www.google.fr/' className='nav-customer' target='_blank' rel='noopener noreferrer'>
            <img src={HeadPhones} alt='customer support' className='img-nav'/>
            <span className='customer-support'>Customer Support</span>
            </a>
            <a href='https://www.google.fr/' className='nav-help' target='_blank' rel='noopener noreferrer'>
            <img src={Help} alt='need help' className='img-nav'/>
            <span className= 'need-help'>Need Help</span>
            </a>
         </div>
         
         <div className='numero-button'>
          <img src={Phone} alt='phone number' className='img-number'/>
          <a href='tel:+12025550104' className='numero'>+1-202-555-0104</a>
        </div>
      
      </div>
    </div>
  );
}

export default Navigation;