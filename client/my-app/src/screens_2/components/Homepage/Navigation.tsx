import React, { useState, useRef, useEffect} from 'react';
import './Navigation.css';
import Twitter from '../../../assets_2/icons/Twitter.svg';
import Facebook from '../../../assets_2/icons/Facebook.svg';
import Pinterest  from '../../../assets_2/icons/Pinterest.svg';
import Reddit from '../../../assets_2/icons/Reddit.svg';
import Youtube from '../../../assets_2/icons/Youtube.svg';
import Instagram from '../../../assets_2/icons/Instagram.svg';
import LogoClicon from '../../../assets_2/branding/Icon3.svg';
import SearchIcon from '../../../assets_2/icons/Regular/MagnifyingGlass.svg';
import Cart from '../../../assets_2/icons/Vector.svg';
import Heart from '../../../assets_2/animations/Heart.svg';
import User from '../../../assets_2/icons/Regular/User.svg';
import CategoryIcon from '../../../assets_2/icons/Regular/CaretDown.svg';
import TrackIcon from '../../../assets_2/icons/Regular/MapPinLine.svg';
import DoubleArrows from '../../../assets_2/icons/Duotone/ArrowsCounterClockwise.svg';
import HeadPhones from '../../../assets_2/icons/Regular/Headphones.svg';
import Help from '../../../assets_2/icons/Regular/Info.svg';
import Phone from '../../../assets_2/icons/Regular/PhoneCall.svg';
import Vectorpoint from '../../../assets_2/icons/Vectorpoint.svg';
import CategoryPopups, {Category} from './CategoryPopups';
import DropdownPopup from './DropdownPopup';
import English from '../../../assets_2/icons/Multi-Language/Ellipse 10.svg';
import Mandarin from '../../../assets_2/icons/Multi-Language/Multi-Language/Ellipse 10.svg';
import Russian from '../../../assets_2/icons/Multi-Language/Multi-Language/Multi-Language/Ellipse 10.svg';
import UserPopup from './UserPopup';

const categories: Category[] = [
  { id: 1, name: 'Computer & Laptop' },
  { id: 2, name: 'Computer Accessories' },
  { 
    id: 3, 
    name: 'Smartphone',
    subcategories: [
      { id: 300, name: 'All'},
      { id: 301, name: 'Iphone'},
      { id: 302, name: 'Samsun'},
      { id: 303, name: 'Realme'},
      { id: 304, name: 'Xiaomi'},
      { id: 305, name: 'Oppo'},
      { id: 306, name: 'Vivo'},
      { id: 307, name: 'OnePlus'},
      { id: 308, name: 'Huawei'},
      { id: 309, name: 'Infinix'},
      { id: 310, name: 'Techno'},
    ],
   },
  { id: 4, name: 'Headphones' },
  { id: 5, name: 'Mobile Accessories' },
  { id: 6, name: 'Gaming Console' },
  { id: 7, name: 'Camera & Photo' },
  { id: 8, name: 'TV & Homes Appliances' },
  { id: 9, name: 'Watchs & Accessories' },
  { id: 10, name: 'GPS & Navigation' },
  { id: 11, name: 'Warable Technology' },
];

const Navigation: React.FC = () =>  {
   // Etat pour le popup des catégories
  const [isPopupOpen, setIsPopupOpen] = useState(false); // etat popup
  const popupRef = useRef<HTMLDivElement>(null);
  
  //Gestion du popup des catégories
  const togglePopup = () => {
    setIsPopupOpen (!isPopupOpen); // ineverse état popup

  };
  
  const closePopup = () => {
    setIsPopupOpen (false);
  };

  // Fermer le popup si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup(); // Fermer le popup
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  
  // etat pour le compteur du panier
  
  //etat et logique  pour UserPopup
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const toggleUserPopup = () => setIsUserPopupOpen(!isUserPopupOpen);
  
  //Gestion des optiosn selectionnées
  const handleLanguageChange = (option: {id: number; label: string; shortLabel: string; icon?: string}) => {
    console.log('Langue sélectionnée :', option.label);
  };

  const handleCurrencyChange = (option: { id: number; label: string}) => {
    console.log('Devise séléctionnée :', option.label);
  };

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
           <DropdownPopup
            label="Eng"
            options={[
              { id: 1, label: "English", shortLabel: 'Eng', icon: English },
              { id: 2, label: "Mandarin", shortLabel: 'Man', icon: Mandarin },
              { id: 3, label: "Russian", shortLabel: 'Rus', icon: Russian },
            ]}
            onOptionSelect={handleLanguageChange}
          />

          <DropdownPopup
            label="USD"
            options={[
              { id: 1, label: "Dollar (USD)", shortLabel: "USD" },
              { id: 2, label: "Euro (EUR)", shortLabel: "EUR" },
            ]}
            onOptionSelect={handleCurrencyChange}
          />
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
              
            </div>
          
          <img src={Heart} alt='Heart' className= 'heart-icon' />
          <img 
             src={User} 
             alt='User' 
             className= 'user-icon'
             onClick={toggleUserPopup}
             />

            <UserPopup
            isOpen={isUserPopupOpen}
            onClose={() => setIsUserPopupOpen(false)}
            />
        
        </div>
      
      </div>

      {/* Section inférieure */}
      <div className="bottom-nav">
         {/* Contenu de BottomNav, comme les liens supplémentaires ou offres spéciales */}
         <div className='category-nav' ref={popupRef}>
          <button  className={`category-button ${isPopupOpen ? 'active' : ''}`} onClick={togglePopup}>
            <span className= 'category-text'>All Category</span>
            <img src={CategoryIcon} alt="buttoncategory" className={`icon-category ${isPopupOpen ? 'rotated' : ''}`}/>
            </button>
            <CategoryPopups 
            categories={categories} // Liste des catégories 
            isOpen={isPopupOpen} // Contrôle si le popup est ouvert
            onClose={closePopup} // Fonction pour fermer le popup
            />
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